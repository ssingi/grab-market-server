const REGISTER = {
  /** 입력 오류 */
  MISSING_FIELDS: { message: "모든 필드를 입력해주세요!" },
  /** 이미 존재하는 사용자 */
  USER_EXISTS: { message: "이미 존재하는 사용자입니다!" },
  /** 회원가입 오류 */
  REGISTER_ERROR: { message: "회원가입 중 오류가 발생했습니다." },
};

const LOGIN = {
  /** 존재하지 않는 사용자 */
  USER_NOT_FOUND: { message: "존재하지 않는 사용자입니다." },
  /** 권한 없음 */
  UNAUTHORIZED: { message: "권한이 없습니다." },
  /** 비밀번호 불일치 */
  INVALID_PASSWORD: { message: "잘못된 비밀번호입니다." },
  /** 로그인 오류 */
  LOGIN_ERROR: { message: "로그인 중 오류가 발생했습니다." },
};

const PRODUCT = {
  /** 서버 오류 */
  INTERNAL_SERVER_ERROR: { message: "서버 내부 에러" },
  /** 상품 목록 조회 오류 */
  PRODUCT_NOT_FOUND: { message: "상품 조회에 에러가 발생했습니다." },
  /** 입력 오류 */
  INVALID_FIELDS: { message: "모든 필드를 입력해주세요!" },
  /** 상품 가격 오류 */
  INVALID_PRICE: { message: "가격은 숫자여야 합니다." },
  /** 상품 생성 오류 */
  PRODUCT_UPLOAD_ERROR: { message: "상품 업로드에 문제가 발생했습니다." },
};

const PURCHASE = {
  /** 존재하지 않는 상품 */
  PRODUCT_NOT_FOUND: { message: "상품을 찾을 수 없습니다." },
  /** 재고 부족 */
  OUT_OF_STOCK: { message: "재고가 없습니다." },
  /** 구매 오류 */
  PURCHASE_ERROR: { message: "구매 처리 중 에러 발생" },
};

const BANNERS = {
  /** 배너 오류 */
  BANNER_ERROR: { message: "배너에서 에러가 발생했습니다." },
};

module.exports = {
  /** 회원 가입 오류 모음 */
  REGISTER: REGISTER,
  /** 로그인 오류 모음 */
  LOGIN: LOGIN,
  /** 상품 관련 오류 모음 */
  PRODUCT: PRODUCT,
  /** 구매 관련 오류 모음 */
  PURCHASE: PURCHASE,
  /** 배너 관련 오류 모음 */
  BANNERS: BANNERS,
};
