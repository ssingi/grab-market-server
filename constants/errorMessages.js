/**
 * 회원 가입 관련 오류 메시지
 * @typedef {Object} RegisterErrors
 * @property {Object} MISSING_FIELDS - 입력 오류
 * @property {string} MISSING_FIELDS.message - "모든 필드를 입력해주세요!"
 * @property {Object} USER_EXISTS - 이미 존재하는 사용자
 * @property {string} USER_EXISTS.message - "이미 존재하는 사용자입니다!"
 * @property {Object} REGISTER_ERROR - 회원가입 오류
 * @property {string} REGISTER_ERROR.message - "회원가입 중 오류가 발생했습니다."
 */

/**
 * 로그인 관련 오류 메시지
 * @typedef {Object} LoginErrors
 * @property {Object} USER_NOT_FOUND - 존재하지 않는 사용자
 * @property {string} USER_NOT_FOUND.message - "존재하지 않는 사용자입니다."
 * @property {Object} UNAUTHORIZED - 권한 없음
 * @property {string} UNAUTHORIZED.message - "권한이 없습니다."
 * @property {Object} INVALID_PASSWORD - 비밀번호 불일치
 * @property {string} INVALID_PASSWORD.message - "잘못된 비밀번호입니다."
 * @property {Object} LOGIN_ERROR - 로그인 오류
 * @property {string} LOGIN_ERROR.message - "로그인 중 오류가 발생했습니다."
 */

/**
 * 상품 관련 오류 메시지
 * @typedef {Object} ProductErrors
 * @property {Object} INTERNAL_SERVER_ERROR - 서버 오류
 * @property {string} INTERNAL_SERVER_ERROR.message - "서버 내부 에러"
 * @property {Object} PRODUCT_NOT_FOUND - 상품 목록 조회 오류
 * @property {string} PRODUCT_NOT_FOUND.message - "상품 조회에 에러가 발생했습니다."
 * @property {Object} INVALID_FIELDS - 입력 오류
 * @property {string} INVALID_FIELDS.message - "모든 필드를 입력해주세요!"
 * @property {Object} INVALID_PRICE - 상품 가격 오류
 * @property {string} INVALID_PRICE.message - "가격은 숫자여야 합니다."
 * @property {Object} PRODUCT_UPLOAD_ERROR - 상품 생성 오류
 * @property {string} PRODUCT_UPLOAD_ERROR.message - "상품 업로드에 문제가 발생했습니다."
 */

/**
 * 구매 관련 오류 메시지
 * @typedef {Object} PurchaseErrors
 * @property {Object} PRODUCT_NOT_FOUND - 존재하지 않는 상품
 * @property {string} PRODUCT_NOT_FOUND.message - "상품을 찾을 수 없습니다."
 * @property {Object} OUT_OF_STOCK - 재고 부족
 * @property {string} OUT_OF_STOCK.message - "재고가 없습니다."
 * @property {Object} PURCHASE_ERROR - 구매 오류
 * @property {string} PURCHASE_ERROR.message - "구매 처리 중 에러 발생"
 */

/**
 * 배너 관련 오류 메시지
 * @typedef {Object} BannerErrors
 * @property {Object} BANNER_ERROR - 배너 오류
 * @property {string} BANNER_ERROR.message - "배너에서 에러가 발생했습니다."
 */

/**
 * 모든 오류 메시지를 포함하는 객체
 * @typedef {Object} ErrorMessages
 * @property {RegisterErrors} REGISTER - 회원 가입 관련 오류 메시지
 * @property {LoginErrors} LOGIN - 로그인 관련 오류 메시지
 * @property {ProductErrors} PRODUCT - 상품 관련 오류 메시지
 * @property {PurchaseErrors} PURCHASE - 구매 관련 오류 메시지
 * @property {BannerErrors} BANNERS - 배너 관련 오류 메시지
 */

/** @type {ErrorMessages} */
const ERROR_MESSAGES = {
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
  PRODUCT: {
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

module.exports = ERROR_MESSAGES;
