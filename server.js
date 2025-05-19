const express = require("express");
const models = require("./models");
const applyMiddleware = require("./middlewares");

const registerRoutes = require("./routes/register");
const productsRoutes = require("./routes/products");
const loginRoutes = require("./routes/login");
const purchaseRoutes = require("./routes/purchase");
const bannerRoutes = require("./routes/banners");

const app = express();
const port = 8080;

applyMiddleware(app);

app.use("/banners", bannerRoutes);
app.use("/login", loginRoutes);
app.use("/register", registerRoutes);
app.use("/products", productsRoutes);
app.use("/purchase", purchaseRoutes);

// 서버 실행
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
  models.sequelize
    .sync({})
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
