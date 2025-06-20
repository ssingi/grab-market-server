const express = require("express");
const { PURCHASE: E_MESSAGES } = require("../constants/errorMessages");
const { CLIENT_ERROR: C_CODES } = require("../constants/statusCodes");
const {
  getProductById,
  decreaseProductQuantity,
} = require("../utils/productUtils");
const models = require("../models");

const router = express.Router();

// 상품 구매
router.post("/:productID", async (req, res) => {
  const { productID } = req.params;
  const {
    userID,
    quantity = 1,
    deliveryAddress = " ", // 암시로 공백 넣어놓음
  } = req.body;

  if (!userID || !deliveryAddress) {
    return res.status(S_CODE.BAD_REQUEST).send(E_MESSAGES.PURCHASE_ERROR);
  }

  try {
    // 해당 상품 조회
    const product = await getProductById(productID);
    if (!product) {
      return res.status(C_CODES.NOT_FOUND).send(E_MESSAGES.PRODUCT_NOT_FOUND);
    }

    // 구매 정보 저장
    await models.Purchase.create({
      userID,
      productID,
      quantity,
      deliveryAddress,
      purchaseDate: new Date(),
    });

    // 수량 감소
    const remainingQuantity = await decreaseProductQuantity(product, quantity);

    // 구매 성공
    res.send({
      result: true,
      message: "구매 성공!",
      remainingQuantity, // 남은 수량을 별도 필드로 반환
    });

    // 장바구니에서 해당 상품 제거
    await models.ShopCart.destroy({ where: { userID, productID } });
  } catch (error) {
    // 구매 실패
    console.error(error);

    // 재고 부족 에러 처리
    if (error.message === E_MESSAGES.OUT_OF_STOCK) {
      return res.status(C_CODES.BAD_REQUEST).send(E_MESSAGES.OUT_OF_STOCK);
    }

    // 기타 에러 처리
    res.status(C_CODES.BAD_REQUEST).send(E_MESSAGES.PURCHASE_ERROR);
  }
});

// 구매 목록 조회
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
