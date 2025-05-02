const express = require("express");
const models = require("../models");
const router = express.Router();

router.get("/", (req, res) => {
  models.Banner.findAll({
    limit: 2,
  })
    .then((result) => {
      res.send({
        banners: result,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("베너에서 에러가 발생했습니다.");
    });
});

module.exports = router;
