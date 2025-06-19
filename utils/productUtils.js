const models = require("../models");
const { PURCHASE: ERROR_MESSAGES } = require("../constants/errorMessages");

/**
 * 상품 목록 조회 함수
 * @returns {Promise<Array>} 상품 목록
 */
const getAllProducts = async () =>
  await models.Product.findAll({
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

/**
 * 상품 조회 함수
 * @param {number} productID - 상품 ID
 * @returns {Promise<Object>} 상품 정보
 */
const getProductById = async (productID) =>
  await models.Product.findOne({ where: { productID } });

/**
 * 상품 생성 함수
 * @param {Object} productData - 상품 데이터
 * @returns {Promise<Object>} 생성된 상품 정보
 */
const createProduct = async (productData) =>
  await models.Product.create(productData);

/**
 * 상품 수량 감소 함수
 * @param {Object} product - 상품 객체
 * @param {number} decreaseBy - 감소할 수량
 * @returns {Promise<number>} 감소된 상품 수량
 * @throws {Error} 재고가 부족한 경우 에러 발생
 */
const decreaseProductQuantity = async (product, decreaseBy = 1) => {
  if (product.quantity < decreaseBy) {
    throw new Error(ERROR_MESSAGES.OUT_OF_STOCK);
  }
  await product.update({ quantity: product.quantity - decreaseBy });
  return product.quantity - decreaseBy;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  decreaseProductQuantity,
};
