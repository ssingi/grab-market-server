const express = require("express");
const models = require("../models");
const multer = require("multer");

const router = express.Router();

// Multer 설정
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

// 이미지 업로드
router.post("/", upload.single("image"), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send("이미지 업로드 실패");
  }

  console.log(file);
  res.send({ imageUrl: file.path });
});

module.exports = router;
