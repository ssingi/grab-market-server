const express = require("express");
const { PURCHASE: E_MESSAGES } = require("../constants/errorMessages");
const { CLIENT_ERROR: S_CODES } = require("../constants/statusCodes");
const {
  getProductById,
  decreaseProductQuantity,
} = require("../utils/productUtils");

const router = express.Router();

// 상품 구매
router.post("/:productID", async (req, res) => {
  const { productID } = req.params;

  try {
    // 해당 상품 조회
    const product = await getProductById(productID);
    if (!product) {
      return res.status(S_CODES.NOT_FOUND).send(E_MESSAGES.PRODUCT_NOT_FOUND);
    }

    // 수량 감소
    const remainingQuantity = await decreaseProductQuantity(product);

    // 구매 성공
    res.send({
      result: true,
      message: `구매 성공! 남은 수량: ${remainingQuantity}`,
    });
  } catch (error) {
    // 구매 실패
    console.error(error);

    // 재고 부족 에러 처리
    if (error.message === E_MESSAGES.OUT_OF_STOCK) {
      return res.status(S_CODES.BAD_REQUEST).send(E_MESSAGES.OUT_OF_STOCK);
    }

    // 기타 에러 처리
    res.status(S_CODES.BAD_REQUEST).send(E_MESSAGES.PURCHASE_ERROR);
  }
});

module.exports = router;
