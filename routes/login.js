const express = require("express");
const { LOGIN: E_MESSAGES } = require("../constants/errorMessages");
const {
  CLIENT_ERROR: C_E_CODE,
  SERVER_ERROR: S_E_CODE,
} = require("../constants/statusCodes");
const { findUserById, verifyPassword } = require("../utils/userUtils");

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

    // 로그인 성공
    res.send({
      message: "로그인 성공",
      user: {
        id: user.id,
        userID: user.userID,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(S_E_CODE.INTERNAL_SERVER_ERROR).send(E_MESSAGES.LOGIN_ERROR);
  }
});

module.exports = router;
