const express = require("express");
const {
  PRODUCT: E_MES,
  LOGIN: U_E_MES,
} = require("../constants/errorMessages");
const {
  SERVER_ERROR: S_E_CODE,
  CLIENT_ERROR: C_E_CODE,
} = require("../constants/statusCodes");
const {
  getAllProducts,
  getProductById,
  createProduct,
} = require("../utils/productUtils");
const { findUserById } = require("../utils/userUtils");

const router = express.Router();

// 상품 목록 조회
router.get("/", async (req, res) => {
  try {
    const productsWithUserID = await getAllProducts();

    // 모든 seller(userID)에 대한 userName 조회 및 중복 제거
    const uniqueSellerIds = [
      ...new Set(productsWithUserID.map((p) => p.seller)),
    ];

    // 유저 정보 한 번에 조회
    const users = await Promise.all(
      uniqueSellerIds.map((id) => findUserById(id))
    );

    // userID -> userName 매핑 객체 생성성
    const userMap = {};
    users.forEach((user) => {
      if (user) userMap[user.userID] = user.userName;
    });

    // 상품의 seller (userID)를 userName으로 변환환
    const products = productsWithUserID.map((product) => ({
      ...product.dataValues,
      seller: userMap[product.seller] || product.seller,
    }));

    // 상품 목록 조회 성공
    res.send({ products });
  } catch (error) {
    // 상품 목록 조회 실패
    console.error(error);
    res
      .status(S_E_CODE.INTERNAL_SERVER_ERROR)
      .send(E_MES.INTERNAL_SERVER_ERROR);
  }
});

// 특정 상품 조회
router.get("/:productID", async (req, res) => {
  try {
    const { productID } = req.params;
    const product = await getProductById(productID);

    // 상품이 존재하지 않는 경우
    if (!product) {
      return res.status(C_E_CODE.BAD_REQUEST).send(E_MES.PRODUCT_NOT_FOUND);
    }

    // 판매자 이름 조회
    const user = await findUserById(product.seller);
    const sellerName = user ? user.userName : product.seller;

    // 상품 조회 성공
    res.send({
      product: {
        ...product.dataValues,
        seller: sellerName,
      },
    });
  } catch (error) {
    // 상품 조회 실패
    console.error("에러 발생", error);
    res
      .status(S_E_CODE.INTERNAL_SERVER_ERROR)
      .send(E_MES.INTERNAL_SERVER_ERROR);
  }
});

// 상품 생성
router.post("/", async (req, res) => {
  try {
    const { name, description, price, imageUrl, quantity } = req.body;
    const seller = req.body.userID;

    // 필수 필드 체크
    if (!name || !description || !price || !seller || !imageUrl || !quantity) {
      return res.status(C_E_CODE.BAD_REQUEST).send(E_MES.INVALID_FIELDS);
    }

    // 가격이 숫자인지 확인
    if (isNaN(price)) {
      return res.status(C_E_CODE.BAD_REQUEST).send(E_MES.INVALID_PRICE);
    }

    // 판매자가 존재하는지 확인
    if (!(await findUserById(seller))) {
      return res.status(C_E_CODE.BAD_REQUEST).send(U_E_MES.USER_NOT_FOUND);
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
    res.status(S_E_CODE.INTERNAL_SERVER_ERROR).send(E_MES.PRODUCT_UPLOAD_ERROR);
  }
});

module.exports = router;
