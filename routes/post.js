const express = require("express");
const router = express.Router();
const models = require("../models");
const {
  SUCCESS,
  SERVER_ERROR: S_E_CODE,
  CLIENT_ERROR: C_E_CODE,
} = require("../constants/statusCodes");

// 예시: 게시글 목록 조회
router.get("/", async (_, res) => {
  try {
    console.log("블로그 목록 조회 요청");
    const blogs = await models.blog.findAll({
      attributes: ["postID", "title", "createdAt", "updatedAt"],
      order: [["createdAt", "DESC"]],
    });

    const result = blogs.map(async (blog) => ({
      blog,
      fileUrl: await models.blogFile.findAll({
        where: { postID: blog.postID },
      }),
    }));

    console.log("블로그 목록 조회 성공:", result);
    res.status(SUCCESS.OK).send(result);
  } catch (error) {
    console.error("블로그 목록 조회 실패:", error);
    res
      .status(S_E_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: "서버 오류가 발생했습니다." });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, content, fileUrl } = req.body;

    const post = await models.blog.create({
      title,
      content,
    });

    fileUrl.map(async (file) => {
      await models.blogFile.create({
        postID: post.postID,
        fileUrl: file,
      });
    });

    res.status(SUCCESS.CREATED).json(post);
  } catch (error) {
    res
      .status(S_E_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: "서버 오류가 발생했습니다." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await models.blog.findOne({
      where: { postID: req.params.id },
    });
    if (!post) {
      return res
        .status(C_E_CODE.NOT_FOUND)
        .json({ message: "게시글을 찾을 수 없습니다." });
    }
    //TODO : 아랫부분 고쳐야됨

    let ip;
    try {
      const response = await axios.get("https://api.ipify.org?format=json");
      ip = response.data.ip;
    } catch (error) {
      console.log("IP 주소를 가져오던 중 오류 발생: ", error.message);
      ip = req.ip;
    }

    const userAgent = req.headers["user-agent"];

    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const hasRecentView = post.viewLogs.some(
      (log) =>
        log.ip === ip &&
        log.userAgent === userAgent &&
        new Date(log.timestamp) > oneDayAgo
    );

    if (!hasRecentView) {
      post.views += 1;
      post.viewLogs.push({
        ip,
        userAgent,
        timestamp: new Date(),
      });
      await post.save();
    }

    let htmlContent;
    try {
      htmlContent = marked.parse(post.content || "");
    } catch (error) {
      console.log("마크다운 변환 실패: ", error);
      htmlContent = post.content;
    }

    const responseData = {
      ...post.toObject(),
      renderedContent: htmlContent,
    };

    res.json(responseData);
  } catch (error) {
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

module.exports = router;
