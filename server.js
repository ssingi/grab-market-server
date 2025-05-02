const express = require("express");
const cors = require("cors");
const models = require("./models");

const registerRoutes = require("./routes/register"); // auth.js 경로 수정
const uploadRoutes = require("./routes/upload"); // upload.js 경로 수정
const productRoutes = require("./routes/product"); // product.js 경로 수정
const loginRoutes = require("./routes/login"); // login.js 경로 수정
const purchaseRoutes = require("./routes/purchase"); // purchase.js 경로 수정

const app = express();

const port = 8080;

// 미들웨어 설정
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3002"], // 클라이언트 도메인
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // 쿠키를 포함한 요청 허용
  })
);
app.use("/uploads", express.static("uploads"));

app.get("/banners", (req, res) => {
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

app.use("/login", loginRoutes); // auth.js 경로 수정
app.use("/register", registerRoutes); // register.js 경로 수정
app.use("/product", productRoutes); // product.js 경로 수정
app.use("/image", uploadRoutes); // upload.js 경로 수정
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

module.exports = { API_URL }; // CommonJS 방식으로 내보내기
