const express = require("express");
const cors = require("cors");
const app = express();
const models = require("./models");
const multer = require("multer");

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

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.get("/products", (req, res) => {
  models.Product.findAll({
    order: [["createdAt", "DESC"]],
    attributes: ["id", "name", "price", "createdAt", "seller", "imageUrl"],
  })
    .then((result) => res.send({ product: result }))
    .catch((error) => {
      console.error(error);
      res.status(400).send("서버 내부 에러");
    });
});

app.post("/products", (req, res) => {
  const body = req.body;
  const { name, description, price, seller, imageUrl } = body;

  if (!name || !description || !price || !seller || !imageUrl) {
    res.status(400).send("모든 필드를 입력해주세요!");
  }

  if (isNaN(price)) {
    res.status(400).send("가격은 숫자여야 합니다.");
  }

  models.Product.create({
    description,
    price,
    seller,
    imageUrl,
    name,
  })
    .then((result) => {
      console.log("상품 생성 결과: ", result);
      res.send({
        result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send("상품 업로드에 문제가 발생했습니다.");
    });
});

app.get("/products/:id", (req, res) => {
  const pathParams = req.params;
  const { id } = pathParams;
  models.Product.findOne({
    where: {
      id: id,
    },
  })
    .then((result) => {
      console.log("PRODUCT : ", result);
      res.send({
        product: result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send("상품 조회에 에러가 발생했습니다.");
    });
});

app.post("/image", upload.single("image"), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send("이미지 업로드 실패");
  }

  console.log(file);

  res.send({
    imageUrl: file.path,
  });
});

app.listen(port, () => {
  console.log("쇼핑몰 서버가 돌아가고 있습니다.");
  models.sequelize
    .sync()
    .then(() => {
      console.log("DB연결 성공!");
    })
    .catch((err) => {
      console.error(err);
      console.log("DB연결 에러: ", err);
      process.exit(1);
    });
});
