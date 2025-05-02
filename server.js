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

app.post("/purchase/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // 1. 해당 상품 조회
    const product = await models.Product.findOne({ where: { id } });

    if (!product) {
      return res.status(404).send("상품을 찾을 수 없습니다.");
    }

    // 2. 수량 확인
    if (product.quantity <= 0) {
      return res.status(400).send("재고가 없습니다.");
    }

    // 3. 수량 감소
    await product.update({ quantity: product.quantity - 1 });
    res.send({
      result: true,
      message: "구매 성공! 남은 수량: " + (product.quantity - 1),
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("구매 처리 중 에러 발생");
  }
});
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
