const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const express = require("express");
const router = express.Router();
const models = require("../models");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { marked } = require("marked");

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// JWT 인증 미들웨어
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "토큰이 없습니다." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "유효하지 않은 토큰입니다." });
  }
};

// 게시글 등록
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { title, content, fileUrl } = req.body;
    const latestPost = await models.Post.findOne({
      order: [["number", "DESC"]],
    });
    const nextNumber = latestPost ? latestPost.number + 1 : 1;

    const post = await models.Post.create({
      number: nextNumber,
      title,
      content,
      fileUrl,
      views: 0,
      viewLogs: [],
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

// 게시글 전체 조회
router.get("/", async (req, res) => {
  try {
    const posts = await models.Post.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

// 게시글 상세 조회
router.get("/:id", async (req, res) => {
  try {
    const post = await models.Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }

    let ip;
    try {
      const response = await axios.get("https://api.ipify.org?format=json");
      ip = response.data.ip;
    } catch (error) {
      ip = req.ip;
    }
    const userAgent = req.headers["user-agent"];

    // 24시간 내 중복 조회 방지
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const viewLogs = post.viewLogs || [];
    const hasRecentView = viewLogs.some(
      (log) =>
        log.ip === ip &&
        log.userAgent === userAgent &&
        new Date(log.timestamp) > oneDayAgo
    );

    if (!hasRecentView) {
      viewLogs.push({
        ip,
        userAgent,
        timestamp: new Date(),
      });
      await post.update({
        views: post.views + 1,
        viewLogs,
      });
    }

    let htmlContent;
    try {
      htmlContent = marked.parse(post.content || "");
    } catch (error) {
      htmlContent = post.content;
    }

    const responseData = {
      ...post.toJSON(),
      renderedContent: htmlContent,
    };

    res.json(responseData);
  } catch (error) {
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

// 게시글 수정
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { title, content, fileUrl } = req.body;
    const post = await models.Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }

    const imgRegex =
      /https:\/\/[^"']*?\.(?:png|jpg|jpeg|gif|PNG|JPG|JPEG|GIF)/g;
    const oldContentImages = post.content.match(imgRegex) || [];
    const newContentImages = content.match(imgRegex) || [];

    const deletedImages = oldContentImages.filter(
      (url) => !newContentImages.includes(url)
    );
    const deletedFiles = (post.fileUrl || []).filter(
      (url) => !(fileUrl || []).includes(url)
    );

    const getS3KeyFromUrl = (url) => {
      try {
        const urlObj = new URL(url);
        return decodeURIComponent(urlObj.pathname.substring(1));
      } catch (err) {
        return null;
      }
    };

    const allDeletedFiles = [...deletedImages, ...deletedFiles];
    for (const fileUrl of allDeletedFiles) {
      const key = getS3KeyFromUrl(fileUrl);
      if (key) {
        try {
          await s3Client.send(
            new DeleteObjectCommand({
              Bucket: process.env.AWS_BUCKET_NAME,
              Key: key,
            })
          );
        } catch (error) {
          // S3 삭제 에러 무시
        }
      }
    }

    await post.update({
      title,
      content,
      fileUrl,
      updatedAt: new Date(),
    });

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

// 게시글 삭제
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const post = await models.Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }

    const imgRegex =
      /https:\/\/[^"']*?\.(?:png|jpg|jpeg|gif|PNG|JPG|JPEG|GIF)/g;
    const contentImages = post.content.match(imgRegex) || [];

    const getS3KeyFromUrl = (url) => {
      try {
        const urlObj = new URL(url);
        return decodeURIComponent(urlObj.pathname.substring(1));
      } catch (err) {
        return null;
      }
    };

    const allFiles = [...contentImages, ...(post.fileUrl || [])];

    for (const fileUrl of allFiles) {
      const key = getS3KeyFromUrl(fileUrl);
      if (key) {
        try {
          await s3Client.send(
            new DeleteObjectCommand({
              Bucket: process.env.AWS_BUCKET_NAME,
              Key: key,
            })
          );
        } catch (error) {
          // S3 삭제 에러 무시
        }
      }
    }

    await post.destroy();
    res.json({ message: "게시글이 삭제가 되었습니다." });
  } catch (error) {
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

module.exports = router;
