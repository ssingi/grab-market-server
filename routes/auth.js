const express = require("express");
const bcrypt = require("bcryptjs");
const models = require("../models");

const router = express.Router();

// 회원가입
router.post("/register", async (req, res) => {
  try {
    const { userID, password, email } = req.body;

    if (!userID || !password || !email) {
      return res.status(400).send("모든 필드를 입력해주세요!");
    }

    const existingUser = await models.User.findOne({ where: { userID } });
    if (existingUser) {
      return res.status(400).send("이미 존재하는 사용자입니다.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await models.User.create({
      userID,
      password: hashedPassword,
      email,
    });

    res.status(201).send({ message: "회원가입 완료", user: newUser });
  } catch (error) {
    console.error("회원가입 오류:", error);
    res.status(500).send("회원가입 중 오류가 발생했습니다.");
  }
});

// 로그인
router.post("/login", async (req, res) => {
  try {
    const { userID, password } = req.body;

    const user = await models.User.findOne({ where: { userID } });
    if (!user) {
      return res.status(401).send("존재하지 않는 사용자입니다.");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).send("잘못된 비밀번호입니다.");
    }

    res.send({
      message: "로그인 성공",
      user: {
        id: user.id,
        userID: user.userID,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("로그인 오류:", error);
    res.status(500).send("로그인 중 오류가 발생했습니다.");
  }
});

module.exports = router;
