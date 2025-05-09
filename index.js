var http = require("http");
var hostname = "127.0.0.1";
var port = 8080;

const {
  SUCCESS: S_CODE,
  CLIENT_ERROR: C_E_CODE,
} = require("./constants/statusCodes");

const server = http.createServer(function (req, res) {
  const path = req.url;
  const method = req.method;

  if (path === "/products") {
    if (method === "GET") {
      res.writeHead(S_CODE.OK, { "Content-Type": "application/json" });
      const products = JSON.stringify([
        {
          name: "농구공",
          price: 5000,
        },
      ]);
      res.end(products);
      return; // 함수 종료
    } else if (method === "POST") {
      res.writeHead(S_CODE.OK, { "Content-Type": "text/plain" });
      res.end("생성되었습니다.");
      return; // 함수 종료
    }
  }

  // 경로가 "/products"가 아닌 경우 처리
  res.writeHead(C_E_CODE.NOT_FOUND, { "Content-Type": "text/plain" });
  res.end("Good Bye");
});

server.listen(port, hostname);

console.log("grab market server on!");
