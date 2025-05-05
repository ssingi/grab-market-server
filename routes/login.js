const express = require("express");
const bcrypt = require("bcrypt");
const models = require("../models");

const router = express.Router();

// 로그인
router.post("/", async (req, res) => {
  try {
    const { userID, password } = req.body; // userID로 변경
    console.log("로그인 요청 데이터:", { userID, password });

    const user = await models.User.findOne({ where: { userID } }); // userID로 변경
    if (!user) {
      return res.status(401).send({ message: "존재하지 않는 사용자입니다." });
    }

    const isValid = await bcrypt.compare(password, user.password);
    console.log("비밀번호 검증 결과:", isValid);

    if (!isValid) {
      return res.status(401).send({ message: "잘못된 비밀번호입니다." });
    }

    res.send({
      message: "로그인 성공",
      user: {
        id: user.id,
        userID: user.userID, // userID로 변경
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).send({ message: "로그인 중 오류가 발생했습니다." });
  }
});

module.exports = router;
