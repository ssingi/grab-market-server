module.exports = {
  REGISTER: {
    MISSING_FIELDS: { message: "모든 필드를 입력해주세요!" },
    USER_EXISTS: { message: "이미 존재하는 사용자입니다!" },
    REGISTER_ERROR: { message: "회원가입 중 오류가 발생했습니다." },
  },
  LOGIN: {
    USER_NOT_FOUND: { message: "존재하지 않는 사용자입니다." },
    UNAUTHORIZED: { message: "권한이 없습니다." },
    INVALID_PASSWORD: { message: "잘못된 비밀번호입니다." },
    LOGIN_ERROR: { message: "로그인 중 오류가 발생했습니다." },
  },
  PRODUCTS: {
    INTERNAL_SERVER_ERROR: { message: "서버 내부 에러" },
    PRODUCT_NOT_FOUND: { message: "상품 조회에 에러가 발생했습니다." },
    INVALID_FIELDS: { message: "모든 필드를 입력해주세요!" },
    INVALID_PRICE: { message: "가격은 숫자여야 합니다." },
    PRODUCT_UPLOAD_ERROR: { message: "상품 업로드에 문제가 발생했습니다." },
  },
  PURCHASE: {
    PRODUCT_NOT_FOUND: { message: "상품을 찾을 수 없습니다." },
    OUT_OF_STOCK: { message: "재고가 없습니다." },
    PURCHASE_ERROR: { message: "구매 처리 중 에러 발생" },
  },
  BANNERS: {
    BANNER_ERROR: { message: "배너에서 에러가 발생했습니다." },
  },
};
