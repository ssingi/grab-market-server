const jwt = require("jsonwebtoken");

// JWT 인증 미들웨어
function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(C_E_CODE.UNAUTHORIZED)
      .json({ message: "토큰이 없습니다." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(C_E_CODE.FORBIDDEN)
      .json({ message: "유효하지 않은 토큰입니다." });
  }
}

module.exports.authenticateToken = authenticateToken;
