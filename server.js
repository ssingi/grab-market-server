const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const models = require("./models");
const app = express();

// Multer 설정
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

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

// 상품 목록 조회
app.get("/products", (req, res) => {
  models.Product.findAll({
    order: [["createdAt", "DESC"]],
    attributes: ["id", "name", "price", "createdAt", "seller", "imageUrl"],
  })
    .then((result) => {
      console.log("PRODUCTS : ", result);
      res.send({ products: result });
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send("서버 내부 에러");
    });
});

// 상품 생성
app.post("/products", (req, res) => {
  const { name, description, price, seller, imageUrl } = req.body;

  if (!name || !description || !price || !seller || !imageUrl) {
    return res.status(400).send("모든 필드를 입력해주세요!");
  }

  if (isNaN(price)) {
    return res.status(400).send("가격은 숫자여야 합니다.");
  }

  models.Product.create({ name, description, price, seller, imageUrl })
    .then((result) => {
      console.log("상품 생성 결과: ", result);
      res.send({ result });
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send("상품 업로드에 문제가 발생했습니다.");
    });
});

// 특정 상품 조회
app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  models.Product.findOne({ where: { id: id } })
    .then((result) => {
      console.log("PRODUCT : ", result);
      res.send({ product: result });
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send("상품 조회에 에러가 발생했습니다.");
    });
});

// 이미지 업로드
app.post("/image", upload.single("image"), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send("이미지 업로드 실패");
  }

  console.log(file);
  res.send({ imageUrl: file.path });
});

// 회원가입
app.post("/register", async (req, res) => {
  try {
    const { userID, password, email } = req.body; // userID로 변경

    if (!userID || !password || !email) {
      // userID로 변경
      return res.status(400).send("모든 필드를 입력해주세요!");
    }

    const existingUser = await models.User.findOne({ where: { userID } }); // userID로 변경
    if (existingUser) {
      return res.status(400).send("이미 존재하는 사용자입니다.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await models.User.create({
      userID, // userID로 변경
      password: hashedPassword,
      email,
    });

    res.status(201).send({ message: "회원가입 완료", user: newUser });
  } catch (error) {
    console.error("회원가입 오류:", error);
    res.status(500).send("회원가입 중 오류가 발생했습니다.");
  }
});

// 로그인
app.post("/login", async (req, res) => {
  try {
    const { userID, password } = req.body; // userID로 변경
    console.log("로그인 요청 데이터:", { userID, password });

    const user = await models.User.findOne({ where: { userID } }); // userID로 변경
    if (!user) {
      return res.status(401).send("존재하지 않는 사용자입니다.");
    }

    const isValid = await bcrypt.compare(password, user.password);
    console.log("비밀번호 검증 결과:", isValid);

    if (!isValid) {
      return res.status(401).send("잘못된 비밀번호입니다.");
    }

    res.send({
      message: "로그인 성공",
      user: {
        id: user.id,
        userID: user.userID, // userID로 변경
        email: user.email,
      },
    });
  } catch (error) {
    console.error("로그인 오류:", error);
    res.status(500).send("로그인 중 오류가 발생했습니다.");
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

module.exports = { API_URL }; // CommonJS 방식으로 내보내기
