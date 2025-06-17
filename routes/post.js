const express = require("express");
const router = express.Router();

// 예시: 게시글 목록 조회
router.get("/", (req, res) => {
  res.json({ message: "게시글 목록입니다." });
});

module.exports = router;
