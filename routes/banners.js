const express = require("express");
const models = require("../models");
const router = express.Router();
const { BANNERS: E_MESSAGES } = require("../constants/errorMessages");
const { SERVER_ERROR: S_E_CODE } = require("../constants/statusCodes");

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
      res.status(S_E_CODE.INTERNAL_SERVER_ERROR).send(E_MESSAGES.BANNER_ERROR);
    });
});

module.exports = router;
