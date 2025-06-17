const express = require("express");
const multer = require("multer");
const { CLIENT_ERROR: C_E_CODE } = require("../constants/statusCodes");

const router = express.Router();

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

// 이미지 업로드 라우트
router.post("/image", upload.single("image"), (req, res) => {
  const file = req.file;
  if (!file) {
    return res
      .status(C_E_CODE.BAD_REQUEST)
      .send({ message: "이미지 업로드 실패" });
  }
  res.send({ imageUrl: `/uploads/${file.filename}` });
});

module.exports = router;
