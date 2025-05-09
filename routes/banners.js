const express = require("express");
const models = require("../models");
const router = express.Router();
const { BANNERS: ERROR_MESSAGES } = require("../constants/errorMessages");
const STATUS_CODES = require("../constants/statusCodes");

// 배너 목록 조회
router.get("/", (req, res) => {
  // 배너 목록 조회 (최대 2개)
  models.Banner.findAll({
    limit: 2,
  })
    .then((result) => {
      // 배너 목록 조회 성공
      res.send({
        banners: result,
      });
    })
    .catch((error) => {
      // 배너 목록 조회 실패
      console.log(error);
      res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .send(ERROR_MESSAGES.BANNER_ERROR);
    });
});

module.exports = router;
