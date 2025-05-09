const models = require("../models");

/**
 * 상품 목록 조회 함수
 * @returns {Promise<Array>} 상품 목록
 */
const getAllProducts = async () => {
  return await models.Product.findAll({
    order: [["createdAt", "DESC"]],
    attributes: [
      "productID",
      "name",
      "price",
      "createdAt",
      "seller",
      "imageUrl",
    ],
  });
};

/**
 * 상품 조회 함수
 * @param {number} productID - 상품 ID
 * @returns {Promise<Object>} 상품 정보
 */
const getProductById = async (productID) => {
  return await models.Product.findOne({ where: { productID } });
};

/**
 * 상품 생성 함수
 * @param {Object} productData - 상품 데이터
 * @returns {Promise<Object>} 생성된 상품 정보
 */
const createProduct = async (productData) => {
  return await models.Product.create(productData);
};

/**
 * 상품 수량 감소 함수
 * @param {Object} product - 상품 객체
 * @returns {Promise<number>} 감소된 상품 수량
 * @throws {Error} 재고가 없는 경우 에러 발생
 */
const decreaseProductQuantity = async (product) => {
  // 재고가 없는 경우 에러 발생
  if (product.quantity <= 0) {
    throw new Error(ERROR_MESSAGES.OUT_OF_STOCK);
  }
  // 수량 감소
  await product.update({ quantity: product.quantity - 1 });
  return product.quantity - 1;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  decreaseProductQuantity,
};
