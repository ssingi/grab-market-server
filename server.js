require("dotenv").config(); // 이 줄이 반드시 필요합니다!
const express = require("express");
const models = require("./models");
const applyMiddleware = require("./middlewares");
const cookieParser = require("cookie-parser");

const registerRoutes = require("./routes/register");
const productsRoutes = require("./routes/products");
const loginRoutes = require("./routes/login");
const purchaseRoutes = require("./routes/purchase");
const bannerRoutes = require("./routes/banners");

// 새로 추가
const contactRoutes = require("./routes/contact");
const postRoutes = require("./routes/post");
const uploadRoutes = require("./routes/upload");
const authRoutes = require("./routes/auth");
const shopCartRoutes = require("./routes/shopCart"); // 추가

const app = express();
const port = 8080;

applyMiddleware(app);
app.use(cookieParser());

app.use("/banners", bannerRoutes);
app.use("/login", loginRoutes);
app.use("/register", registerRoutes);
app.use("/products", productsRoutes);
app.use("/purchase", purchaseRoutes);

// 새로 추가
app.use("/api/contact", contactRoutes);
app.use("/api/post", postRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/auth", authRoutes);
app.use("/shopCart", shopCartRoutes); // 아래 줄 추가

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
