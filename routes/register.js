const express = require("express");
const bcrypt = require("bcrypt");
const models = require("../models");

const router = express.Router();

// 회원가입
router.post("/", async (req, res) => {
  try {
    const { userID, password, email } = req.body; // userID로 변경

    if (!userID || !password || !email) {
      // userID로 변경
      return res.status(400).send({ message: "모든 필드를 입력해주세요!" });
    }

    const existingUser = await models.User.findOne({ where: { userID } }); // userID로 변경
    if (existingUser) {
      return res.status(400).send({ message: "이미 존재하는 사용자입니다." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await models.User.create({
      userID, // userID로 변경
      password: hashedPassword,
      email,
    });

    res.status(201).send({ message: "회원가입 완료", user: newUser });
  } catch (error) {
    console.error("회원가입 오류:", error);
    res.status(500).send({ message: "회원가입 중 오류가 발생했습니다." });
  }
});

module.exports = router;
