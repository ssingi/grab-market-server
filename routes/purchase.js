const express = require("express");
const models = require("../models");

const router = express.Router();

// 상품 구매
router.post("/:productID", async (req, res) => {
  const { productID } = req.params;

  try {
    // 1. 해당 상품 조회
    const product = await models.Product.findOne({ where: { productID } });

    if (!product) {
      return res.status(404).send({ message: "상품을 찾을 수 없습니다." });
    }

    // 2. 수량 확인
    if (product.quantity <= 0) {
      return res.status(400).send({ message: "재고가 없습니다." });
    }

    // 3. 수량 감소
    await product.update({ quantity: product.quantity - 1 });
    res.send({
      result: true,
      message: "구매 성공! 남은 수량: " + (product.quantity - 1),
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "구매 처리 중 에러 발생" });
  }
});

module.exports = router;
