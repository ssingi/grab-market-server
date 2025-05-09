const bcrypt = require("bcrypt");
const models = require("../models");

// 사용자 조회 함수
const findUserById = async (userID) => {
  return await models.User.findOne({ where: { userID } });
};

// 비밀번호 해시 함수
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// 사용자 생성 함수
const createUser = async (userData) => {
  return await models.User.create(userData);
};

// 비밀번호 검증 함수
const verifyPassword = async (inputPassword, storedPassword) => {
  return await bcrypt.compare(inputPassword, storedPassword);
};

module.exports = {
  findUserById,
  hashPassword,
  createUser,
  verifyPassword,
};
