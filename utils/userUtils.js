const bcrypt = require("bcrypt");
const models = require("../models");

/**
 * 사용자 조회 함수
 * @param {number} userID - 사용자 ID
 * @returns {Promise<Object>} 사용자 정보
 */
const findUserById = async (userID) =>
  await models.User.findOne({ where: { userID } });

/**
 * 비밀번호 해시 함수
 * @param {string} password - 비밀번호
 * @returns {Promise<string>} 해시된 비밀번호
 */
const hashPassword = async (password) => await bcrypt.hash(password, 10);

/**
 * 사용자 생성 함수
 * @param {Object} userData - 사용자 데이터
 * @returns {Promise<Object>} 생성된 사용자 정보
 */
const createUser = async (userData) => await models.User.create(userData);

/**
 * 비밀번호 검증 함수
 * @param {string} inputPassword - 입력된 비밀번호
 * @param {string} storedPassword - 저장된 해시 비밀번호
 * @returns {Promise<boolean>} 비밀번호 일치 여부
 */
const verifyPassword = async (inputPassword, storedPassword) =>
  await bcrypt.compare(inputPassword, storedPassword);

module.exports = {
  findUserById,
  hashPassword,
  createUser,
  verifyPassword,
};
