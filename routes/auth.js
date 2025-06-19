const express = require("express");
const jwt = require("jsonwebtoken");
const { CLIENT_ERROR } = require("../constants/statusCodes");
const router = express.Router();

router.post("/verify-token", (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(CLIENT_ERROR.UNAUTHORIZED)
        .json({ isValid: false, message: "토큰 없음" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ isValid: true, user: decoded });
  } catch (error) {
    res
      .status(CLIENT_ERROR.UNAUTHORIZED)
      .json({ isValid: false, message: "유효하지 않은 토큰" });
  }
});

router.post("/logout", (_, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });
  res.json({ message: "로그아웃 성공" });
});

module.exports = router;
