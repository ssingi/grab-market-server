const express = require("express");
const cors = require("cors");
const multer = require("multer");

/** multer 설정 */
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

/** 미들웨어 설정 */
module.exports = (app) => {
  // JSON 파싱 미들웨어
  app.use(express.json());

  // CORS 설정
  app.use(
    cors({
      origin: ["http://localhost:3000", "http://localhost:3002"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );

  // 정적 파일 제공
  app.use("/uploads", express.static("uploads"));

  // 이미지 업로드 라우트
  app.post("/image", upload.single("image"), (req, res) => {
    const file = req.file;

    if (!file) {
      return res.status(400).send({ message: "이미지 업로드 실패" });
    }

    console.log(file);
    res.send({ imageUrl: file.path });
  });
};
