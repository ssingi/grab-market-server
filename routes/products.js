const express = require("express");
const { PRODUCT: E_MESSAGES } = require("../constants/errorMessages");
const {
  SERVER_ERROR: S_E_CODE,
  CLIENT_ERROR: C_E_CODE,
} = require("../constants/statusCodes");
const {
  getAllProducts,
  getProductById,
  createProduct,
} = require("../utils/productUtils");

const router = express.Router();

// 상품 목록 조회
router.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();
    // 상품 목록 조회 성공
    res.send({ products });
  } catch (error) {
    // 상품 목록 조회 실패
    console.error(error);
    res
      .status(S_E_CODE.INTERNAL_SERVER_ERROR)
      .send(E_MESSAGES.INTERNAL_SERVER_ERROR);
  }
});

// 특정 상품 조회
router.get("/:productID", async (req, res) => {
  try {
    const { productID } = req.params;
    const product = await getProductById(productID);

    // 상품이 존재하지 않는 경우
    if (!product) {
      return res
        .status(C_E_CODE.BAD_REQUEST)
        .send(E_MESSAGES.PRODUCT_NOT_FOUND);
    }

    // 상품 조회 성공
    res.send({ product });
  } catch (error) {
    // 상품 조회 실패
    console.error(error);
    res
      .status(S_E_CODE.INTERNAL_SERVER_ERROR)
      .send(E_MESSAGES.INTERNAL_SERVER_ERROR);
  }
});

// 상품 생성
router.post("/", async (req, res) => {
  try {
    const { name, description, price, seller, imageUrl, quantity } = req.body;

    // 필수 필드 체크
    if (!name || !description || !price || !seller || !imageUrl || !quantity) {
      return res.status(C_E_CODE.BAD_REQUEST).send(E_MESSAGES.INVALID_FIELDS);
    }

    // 가격이 숫자인지 확인
    if (isNaN(price)) {
      return res.status(C_E_CODE.BAD_REQUEST).send(E_MESSAGES.INVALID_PRICE);
    }

    // 상품 생성
    const product = await createProduct({
      name,
      description,
      price,
      seller,
      imageUrl,
      quantity,
    });

    // 상품 생성 성공
    res.send({ product });
  } catch (error) {
    // 상품 생성 실패
    console.error(error);
    res
      .status(S_E_CODE.INTERNAL_SERVER_ERROR)
      .send(E_MESSAGES.PRODUCT_UPLOAD_ERROR);
  }
});

module.exports = router;
