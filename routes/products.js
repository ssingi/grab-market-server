const express = require("express");
const models = require("../models");

const router = express.Router();

// 상품 목록 조회
router.get("/", (req, res) => {
  models.Product.findAll({
    order: [["createdAt", "DESC"]],
    attributes: ["id", "name", "price", "createdAt", "seller", "imageUrl"],
  })
    .then((result) => {
      res.send({ products: result });
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send("서버 내부 에러");
    });
});

// 특정 상품 조회
router.get("/:id", (req, res) => {
  const { id } = req.params;
  models.Product.findOne({ where: { id } })
    .then((result) => {
      res.send({ product: result });
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send("상품 조회에 에러가 발생했습니다.");
    });
});

// 상품 생성
router.post("/", (req, res) => {
  const { name, description, price, seller, imageUrl } = req.body;

  if (!name || !description || !price || !seller || !imageUrl) {
    return res.status(400).send("모든 필드를 입력해주세요!");
  }

  if (isNaN(price)) {
    return res.status(400).send("가격은 숫자여야 합니다.");
  }

  models.Product.create({ name, description, price, seller, imageUrl })
    .then((result) => {
      res.send({ result });
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send("상품 업로드에 문제가 발생했습니다.");
    });
});

module.exports = router;
