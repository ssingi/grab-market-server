const express = require("express");
const { REGISTER: E_MESSAGES } = require("../constants/errorMessages");
const {
  SUCCESS: S_CODE,
  CLIENT_ERROR: C_E_CODE,
  SERVER_ERROR: S_E_CODE,
} = require("../constants/statusCodes");
const {
  findUserById,
  hashPassword,
  createUser,
} = require("../utils/userUtils");

const router = express.Router();

// 회원가입
router.post("/", async (req, res) => {
  try {
    const { userID, password, email } = req.body;

    if (!userID || !password || !email) {
      return res.status(C_E_CODE.BAD_REQUEST).send(E_MESSAGES.MISSING_FIELDS);
    }

    // 사용자 중복 확인
    const existingUser = await findUserById(userID);
    if (existingUser) {
      return res.status(C_E_CODE.BAD_REQUEST).send(E_MESSAGES.USER_EXISTS);
    }

    // 비밀번호 해시 및 사용자 생성
    const hashedPassword = await hashPassword(password);
    const newUser = await createUser({
      userID,
      password: hashedPassword,
      email,
    });

    // 회원가입 성공
    res
      .status(S_CODE.CREATED)
      .send({ message: "회원가입 완료", user: newUser });
  } catch (error) {
    // 회원가입 실패
    console.error("회원가입 오류:", error);
    res.status(S_E_CODE.INTERNAL_SERVER_ERROR).send(E_MESSAGES.REGISTER_ERROR);
  }
});

module.exports = router;
