const express = require("express");
const models = require("./models");
const applyMiddleware = require("./middlewares"); // authMiddleware.js 경로 수정

const registerRoutes = require("./routes/register"); // auth.js 경로 수정
const productsRoutes = require("./routes/products"); // product.js 경로 수정
const loginRoutes = require("./routes/login"); // login.js 경로 수정
const purchaseRoutes = require("./routes/purchase"); // purchase.js 경로 수정
const bannerRoutes = require("./routes/banners"); // banners.js 경로 수정

const app = express();
const port = 8080;

applyMiddleware(app); // authMiddleware.js 경로 수정

app.use("/banners", bannerRoutes); // banners.js 경로 수정
app.use("/login", loginRoutes); // login.js 경로 수정
app.use("/register", registerRoutes); // register.js 경로 수정
app.use("/products", productsRoutes); // product.js 경로 수정
app.use("/purchase", purchaseRoutes); // purchase.js 경로 수정

// 서버 실행
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
  models.sequelize
    .sync()
    .then(() => {
      console.log("DB 연결 성공!");
    })
    .catch((err) => {
      console.error("DB 연결 실패:", err);
      process.exit(1);
    });
});

const API_URL = "http://localhost:8080"; // 서버의 포트와 일치하도록 설정

module.exports = { API_URL };
