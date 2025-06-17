const express = require("express");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const {
  CLIENT_ERROR: C_E_CODE,
  SERVER_ERROR: S_E_CODE,
} = require("../constants/statusCodes");
require("dotenv").config();

const router = express.Router();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

const fileUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },
});

// 인증 미들웨어 예시 (쿠키 기반, 필요시 수정)
const verifyToken = (req, res, next) => {
  // 실제 서비스에서는 JWT 등으로 검증 필요
  const token = req.cookies?.token;
  if (!token) {
    return res
      .status(C_E_CODE.UNAUTHORIZED)
      .json({ message: "인증되지 않은 요청입니다." });
  }
  next();
};

// 이미지 업로드
router.post("/image", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res
        .status(C_E_CODE.BAD_REQUEST)
        .json({ message: "파일이 없습니다." });
    }
    const ext = file.originalname.split(".").pop();
    const fileName = `${uuidv4()}.${ext}`;
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `post-images/${fileName}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    await s3Client.send(new PutObjectCommand(uploadParams));
    const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/post-images/${fileName}`;
    res.json({ imageUrl });
  } catch (error) {
    console.error("S3 upload error:", error);
    res
      .status(S_E_CODE.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to upload image" });
  }
});

// 파일 업로드
router.post(
  "/file",
  verifyToken,
  fileUpload.single("file"),
  async (req, res) => {
    try {
      const file = req.file;
      const originalName = req.body.originalName;
      if (!file || !originalName) {
        return res
          .status(C_E_CODE.BAD_REQUEST)
          .json({ message: "파일 또는 파일명이 없습니다." });
      }
      const decodedFileName = decodeURIComponent(originalName);
      const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `post-files/${decodedFileName}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        ContentDisposition: `attachment; filename*=UTF-8''${encodeURIComponent(
          decodedFileName
        )}`,
      };
      await s3Client.send(new PutObjectCommand(uploadParams));
      const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/post-files/${decodedFileName}`;
      res.json({ fileUrl, originalName: decodedFileName });
    } catch (error) {
      console.error("S3 upload error:", error);
      res
        .status(S_E_CODE.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to upload file" });
    }
  }
);

module.exports = router;
