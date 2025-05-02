const express = require("express");
const cors = require("cors");
const models = require("./models");

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const uploadRoutes = require("./routes/upload");

const app = express();
const port = 8080;

// 미들웨어 설정
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3002"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use("/uploads", express.static("uploads"));

// 라우트 설정
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/image", uploadRoutes);

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
