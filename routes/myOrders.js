const express = require("express");
const models = require("../models");
const router = express.Router();

// JWT 인증 미들웨어 등 필요
router.get("/", async (req, res) => {
  const userID = req.user.userID; // JWT에서 추출
  try {
    const purchases = await models.Purchase.findAll({
      where: { userID },
      include: [{ model: models.Product }],
    });
    const products = purchases.map((p) => p.Product);
    res.json({ products });
  } catch (e) {
    res.status(500).json({ message: "주문 상품 조회 실패" });
  }
});

module.exports = router;
