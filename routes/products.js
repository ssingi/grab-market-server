const express = require("express");
const {
  PRODUCT: E_MES,
  LOGIN: U_E_MES,
} = require("../constants/errorMessages");
const {
  SERVER_ERROR: S_E_CODE,
  CLIENT_ERROR: C_E_CODE,
} = require("../constants/statusCodes");
const { getProductById, createProduct } = require("../utils/productUtils");
const { findUserById } = require("../utils/userUtils");
const models = require("../models");

const router = express.Router();

// 상품 목록 조회
router.get("/", async (__, res) => {
  try {
    const products = await models.Product.findAll({
      include: [
        {
          model: models.User,
          attributes: ["userName"],
        },
      ],
      order: [["createdAt", "DESC"]],
      attributes: [
        "productID",
        "name",
        "price",
        "createdAt",
        "imageUrl",
        "quantity",
        "seller",
      ],
    });

    const result = products.map((product) => ({
      productID: product.productID,
      imageUrl: product.imageUrl,
      seller: product.User?.userName ?? product.seller,
      name: product.name,
      price: product.price,
      createdAt: product.createdAt,
      quantity: product.quantity,
    }));

    console.log(result);

    res.send({ products: result });
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
    const { name, description, price, imageUrl, quantity, seller } = req.body;

    // 필수 필드 체크
    if (!name || !description || !price || !seller || !imageUrl || !quantity) {
      return res.status(C_E_CODE.BAD_REQUEST).send(E_MES.INVALID_FIELDS);
    }

    // 가격이 숫자인지 확인
    if (isNaN(price)) {
      console.log("가격이 숫자가 아님");
      return res.status(C_E_CODE.BAD_REQUEST).send(E_MES.INVALID_PRICE);
    }

    // 판매자가 존재하는지 확인
    if (!(await findUserById(seller))) {
      console.log("존재하지 않는 판매자");
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
