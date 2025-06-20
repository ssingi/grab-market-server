const express = require("express");
const router = express.Router();
const models = require("../models");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { marked } = require("marked");
const {
  SUCCESS,
  SERVER_ERROR,
  CLIENT_ERROR,
} = require("../constants/statusCodes");
const { deleteS3Files } = require("../utils/postUtils");

// JWT 인증 미들웨어
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(CLIENT_ERROR.UNAUTHORIZED)
      .json({ message: "토큰이 없습니다." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(CLIENT_ERROR.FORBIDDEN)
      .json({ message: "유효하지 않은 토큰입니다." });
  }
};

// 게시글 등록
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { title, content, fileUrl, productID } = req.body;
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
      productID,
    });

    if (Array.isArray(fileUrl)) {
      await Promise.all(
        fileUrl.map(async (url) =>
          models.postFile.create({ fileUrl: url, postID: post.id })
        )
      );
    }

    res.status(SUCCESS.CREATED).json(post);
  } catch (error) {
    res
      .status(SERVER_ERROR.INTERNAL_SERVER_ERROR)
      .json({ message: "서버 오류가 발생했습니다." });
  }
});

// 게시글 전체 조회
router.get("/", async (_, res) => {
  try {
    const posts = await models.Post.findAll({
      include: [{ model: models.PostFile }],
      order: [["createdAt", "DESC"]],
    });

    const result = posts.map((post) => ({
      postID: post.postID,
      number: post.number,
      title: post.title,
      content: post.content,
      views: post.views,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      fileUrl: post.PostFiles.map((file) => file.fileUrl),
    }));

    res.status(SUCCESS.OK).json(result);
  } catch (error) {
    res
      .status(SERVER_ERROR.INTERNAL_SERVER_ERROR)
      .json({ message: "서버 오류가 발생했습니다." });
  }
});

// 게시글 상세 조회
router.get("/:id", async (req, res) => {
  try {
    const post = await models.Post.findByPk(req.params.id, {
      include: [{ model: models.PostFile }],
    });

    if (!post) {
      return res
        .status(CLIENT_ERROR.NOT_FOUND)
        .json({ message: "게시글을 찾을 수 없습니다." });
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

    const recentLog = await models.PostLog.findOne({
      where: {
        postID: post.postID,
        ip,
        userAgent,
        timestamp: { [models.Sequelize.Op.gt]: oneDayAgo },
      },
    });

    if (!recentLog) {
      await post.increment("views", { by: 1 });
      await models.PostLog.create({
        postID: post.postID,
        ip,
        userAgent,
        timestamp: new Date(),
      });
    }

    let htmlContent;
    try {
      htmlContent = marked.parse(post.content || "");
    } catch (error) {
      htmlContent = post.content;
    }

    const responseData = {
      postID: post.postID,
      number: post.number,
      title: post.title,
      content: post.content,
      views: post.views,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      userID: post.userID,
      fileUrl: post.PostFiles.map((file) => file.fileUrl),
      renderedContent: htmlContent,
      productID: post.productID,
    };

    res.status(SUCCESS.OK).json(responseData);
  } catch (error) {
    res
      .status(SERVER_ERROR.INTERNAL_SERVER_ERROR)
      .json({ message: "서버 오류가 발생했습니다." });
  }
});

// 게시글 수정
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { title, content, fileUrl, productID } = req.body;
    const post = await models.Post.findByPk(req.params.id, {
      include: [
        {
          model: models.PostFile,
          attributes: ["fileUrl"],
        },
      ],
    });

    if (!post) {
      return res
        .status(CLIENT_ERROR.NOT_FOUND)
        .json({ message: "게시글을 찾을 수 없습니다." });
    }

    const oldFiles = post.PostFiles.map((file) => file.fileUrl);
    const newFiles = Array.isArray(fileUrl) ? fileUrl : [];

    const deletedFiles = oldFiles.filter((url) => !newFiles.includes(url));
    await deleteS3Files(deletedFiles);

    await models.PostFile.destroy({ where: { postID: post.id } });

    await Promise.all(
      newFiles.map((url) =>
        models.PostFile.create({ fileUrl: url, postID: post.postID })
      )
    );

    await post.update({
      title,
      content,
      updatedAt: new Date(),
      productID,
    });

    res.status(SUCCESS.OK).json(post);
  } catch (error) {
    res
      .status(SERVER_ERROR.INTERNAL_SERVER_ERROR)
      .json({ message: "서버 오류가 발생했습니다." });
  }
});

// 게시글 삭제
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const post = await models.Post.findByPk(req.params.id, {
      include: [{ model: models.PostFile }],
    });
    if (!post) {
      return res
        .status(CLIENT_ERROR.NOT_FOUND)
        .json({ message: "게시글을 찾을 수 없습니다." });
    }
    await deleteS3Files(post.PostFiles.map((file) => file.fileUrl));

    await post.destroy();
    res.status(SUCCESS.OK).json({ message: "게시글이 삭제가 되었습니다." });
  } catch (error) {
    res
      .status(SERVER_ERROR.INTERNAL_SERVER_ERROR)
      .json({ message: "서버 오류가 발생했습니다." });
  }
});

module.exports = router;
