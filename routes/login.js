const express = require("express");
const { LOGIN: E_MESSAGES } = require("../constants/errorMessages");
const {
  CLIENT_ERROR: C_E_CODE,
  SERVER_ERROR: S_E_CODE,
} = require("../constants/statusCodes");
const { findUserById, verifyPassword } = require("../utils/userUtils");
const jwt = require("jsonwebtoken");

const router = express.Router();

// 로그인 라우터
router.post("/", async (req, res) => {
  try {
    const { userID, password } = req.body;
    console.log("로그인 요청 데이터:", { userID, password });

    // 사용자 조회
    const user = await findUserById(userID);
    if (!user) {
      return res.status(C_E_CODE.UNAUTHORIZED).send(E_MESSAGES.USER_NOT_FOUND);
    }

    // 비밀번호 검증
    const isValid = await verifyPassword(password, user.password);
    console.log("비밀번호 검증 결과:", isValid);

    if (!isValid) {
      return res
        .status(C_E_CODE.UNAUTHORIZED)
        .send(E_MESSAGES.INVALID_PASSWORD);
    }

    // JWT 토큰 생성
    const token = jwt.sign(
      { userID: user.userID, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 토큰을 쿠키에 저장
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // 개발환경에서는 false
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1일
    });
    res.json({
      message: "로그인 성공",
      user: { userID: user.userID, email: user.email },
    }); // user 객체로 반환
  } catch (error) {
    console.error("로그인 에러:", error); // 에러 로그 추가
    res.status(S_E_CODE.INTERNAL_SERVER_ERROR).send(E_MESSAGES.LOGIN_ERROR);
  }
});

module.exports = router;
