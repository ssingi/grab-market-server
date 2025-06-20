const express = require("express");
const { PURCHASE: E_MESSAGES } = require("../constants/errorMessages");
const {
  SUCCESS: S_CODES,
  CLIENT_ERROR: C_CODES,
} = require("../constants/statusCodes");
const { getProductById } = require("../utils/productUtils");
const models = require("../models");

const router = express.Router();

// 상품 추가
router.post("/:productID", async (req, res) => {
  const { productID } = req.params;
  const { userID, quantity = 1 } = req.body;

  if (!userID || !productID || quantity <= 0) {
    return res
      .status(C_CODES.BAD_REQUEST)
      .send({ message: "모든 필드를 입력해주세요!" });
  }

  try {
    // 해당 상품 조회
    const product = await getProductById(productID);
    if (!product) {
      return res.status(C_CODES.NOT_FOUND).send(E_MESSAGES.PRODUCT_NOT_FOUND);
    }

    // 상품 정보 저장
    await models.ShopCart.create({ userID, productID, quantity });

    res.status(S_CODES.CREATED).send({
      result: true,
      message: "추가 성공!",
    });
  } catch (error) {
    // 구매 실패
    console.error(error);

    // 기타 에러 처리
    res.status(C_CODES.BAD_REQUEST).send(E_MESSAGES.PURCHASE_ERROR);
  }
});

// 장바구니 목록 불러오기
router.get("/", async (req, res) => {
  const { userID } = req.body;
  try {
    // 해당 상품 조회
    const products = await models.ShopCart.findAll({ where: { userID } });

    res.status(S_CODES.OK).json(products);
  } catch (error) {
    // 구매 실패
    console.error(error);

    // 기타 에러 처리
    res.status(C_CODES.BAD_REQUEST).send(E_MESSAGES.PURCHASE_ERROR);
  }
});

// 장바구니 상품 삭제
router.delete("/:productID", async (req, res) => {
  const { productID } = req.params;
  const { userID } = req.body;
  if (!userID || !productID) {
    return res
      .status(C_CODES.BAD_REQUEST)
      .send({ message: "모든 필드를 입력해주세요!" });
  }
  try {
    // 해당 상품 조회
    const product = await getProductById(productID);
    if (!product) {
      return res.status(C_CODES.NOT_FOUND).send(E_MESSAGES.PRODUCT_NOT_FOUND);
    }

    // 장바구니에서 상품 삭제
    await models.ShopCart.destroy({ where: { userID, productID } });

    res.status(S_CODES.OK).send({
      result: true,
      message: "삭제 성공!",
    });
  } catch (error) {
    // 삭제 실패
    console.error(error);

    // 기타 에러 처리
    res.status(C_CODES.BAD_REQUEST).send(E_MESSAGES.PURCHASE_ERROR);
  }
});

// 장바구니 상품 수량 수정
router.put("/:productID", async (req, res) => {
  const { productID } = req.params;
  const { userID, quantity } = req.body;

  if (!userID || !productID || quantity <= 0) {
    return res
      .status(C_CODES.BAD_REQUEST)
      .send({ message: "모든 필드를 입력해주세요!" });
  }

  try {
    // 해당 상품 조회
    const product = await getProductById(productID);
    if (!product) {
      return res.status(C_CODES.NOT_FOUND).send(E_MESSAGES.PRODUCT_NOT_FOUND);
    }

    // 장바구니에서 상품 수량 수정
    await models.ShopCart.update(
      { quantity },
      { where: { userID, productID } }
    );

    res.status(S_CODES.OK).send({
      result: true,
      message: "수정 성공!",
    });
  } catch (error) {
    // 수정 실패
    console.error(error);

    // 기타 에러 처리
    res.status(C_CODES.BAD_REQUEST).send(E_MESSAGES.PURCHASE_ERROR);
  }
});

module.exports = router;
