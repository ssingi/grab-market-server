/**
 * HTTP 상태 코드 정의
 *
 * - 1xx: Informational (정보 응답)
 * - 2xx: Success (성공)
 * - 3xx: Redirection (리다이렉션)
 * - 4xx: Client Error (클라이언트 오류)
 * - 5xx: Server Error (서버 오류)
 */

/** * HTTP 상태 코드 객체
 *
 * @typedef {Object} StatusCodes
 * @property {Object} INFORMATIONAL - 1xx: 정보 응답
 * @property {number} INFORMATIONAL.CONTINUE - 100: 요청을 계속하십시오.
 * @property {number} INFORMATIONAL.SWITCHING_PROTOCOLS - 101: 프로토콜 전환
 * @property {number} INFORMATIONAL.PROCESSING - 102: 처리 중
 * @property {number} INFORMATIONAL.EARLY_HINTS - 103: 초기 힌트
 *
 * @property {Object} SUCCESS - 2xx: 성공
 * @property {number} SUCCESS.OK - 200: 성공
 * @property {number} SUCCESS.CREATED - 201: 생성됨
 * @property {number} SUCCESS.ACCEPTED - 202: 승인됨
 * @property {number} SUCCESS.NON_AUTHORITATIVE_INFORMATION - 203: 신뢰할 수 없는 정보
 * @property {number} SUCCESS.NO_CONTENT - 204: 콘텐츠 없음
 * @property {number} SUCCESS.RESET_CONTENT - 205: 콘텐츠 재설정
 * @property {number} SUCCESS.PARTIAL_CONTENT - 206: 일부 콘텐츠
 * @property {number} SUCCESS.MULTI_STATUS - 207: 다중 상태
 * @property {number} SUCCESS.ALREADY_REPORTED - 208: 이미 보고됨
 * @property {number} SUCCESS.IM_USED - 226: IM 사용됨
 *
 * @property {Object} REDIRECTION - 3xx: 리다이렉션
 * @property {number} REDIRECTION.MULTIPLE_CHOICES - 300: 여러 선택
 * @property {number} REDIRECTION.MOVED_PERMANENTLY - 301: 영구 이동
 * @property {number} REDIRECTION.FOUND - 302: 발견됨
 * @property {number} REDIRECTION.SEE_OTHER - 303: 다른 곳을 참조하십시오.
 * @property {number} REDIRECTION.NOT_MODIFIED - 304: 수정되지 않음
 * @property {number} REDIRECTION.USE_PROXY - 305: 프록시 사용
 * @property {number} REDIRECTION.TEMPORARY_REDIRECT - 307: 임시 리다이렉션
 * @property {number} REDIRECTION.PERMANENT_REDIRECT - 308: 영구 리다이렉션
 *
 * @property {Object} CLIENT_ERROR - 4xx: 클라이언트 오류
 * @property {number} CLIENT_ERROR.BAD_REQUEST - 400: 잘못된 요청
 * @property {number} CLIENT_ERROR.UNAUTHORIZED - 401: 인증되지 않음
 * @property {number} CLIENT_ERROR.PAYMENT_REQUIRED - 402: 결제 필요
 * @property {number} CLIENT_ERROR.FORBIDDEN - 403: 금지됨
 * @property {number} CLIENT_ERROR.NOT_FOUND - 404: 찾을 수 없음
 * @property {number} CLIENT_ERROR.METHOD_NOT_ALLOWED - 405: 허용되지 않는 메서드
 * @property {number} CLIENT_ERROR.NOT_ACCEPTABLE - 406: 허용되지 않음
 * @property {number} CLIENT_ERROR.PROXY_AUTHENTICATION_REQUIRED - 407: 프록시 인증 필요
 * @property {number} CLIENT_ERROR.REQUEST_TIMEOUT - 408: 요청 시간 초과
 * @property {number} CLIENT_ERROR.CONFLICT - 409: 충돌
 * @property {number} CLIENT_ERROR.GONE - 410: 사라짐
 * @property {number} CLIENT_ERROR.LENGTH_REQUIRED - 411: 길이 필요
 * @property {number} CLIENT_ERROR.PRECONDITION_FAILED - 412: 전제 조건 실패
 * @property {number} CLIENT_ERROR.PAYLOAD_TOO_LARGE - 413: 페이로드가 너무 큼
 * @property {number} CLIENT_ERROR.URI_TOO_LONG - 414: URI가 너무 김
 * @property {number} CLIENT_ERROR.UNSUPPORTED_MEDIA_TYPE - 415: 지원되지 않는 미디어 유형
 * @property {number} CLIENT_ERROR.RANGE_NOT_SATISFIABLE - 416: 범위를 만족할 수 없음
 * @property {number} CLIENT_ERROR.EXPECTATION_FAILED - 417: 기대 실패
 * @property {number} CLIENT_ERROR.IM_A_TEAPOT - 418: 나는 찻주전자입니다
 * @property {number} CLIENT_ERROR.MISDIRECTED_REQUEST - 421: 잘못된 요청
 * @property {number} CLIENT_ERROR.UNPROCESSABLE_ENTITY - 422: 처리할 수 없는 엔터티
 * @property {number} CLIENT_ERROR.LOCKED - 423: 잠김
 * @property {number} CLIENT_ERROR.FAILED_DEPENDENCY - 424: 종속성 실패
 * @property {number} CLIENT_ERROR.TOO_EARLY - 425: 너무 이른 요청
 * @property {number} CLIENT_ERROR.UPGRADE_REQUIRED - 426: 업그레이드 필요
 * @property {number} CLIENT_ERROR.PRECONDITION_REQUIRED - 428: 전제 조건 필요
 * @property {number} CLIENT_ERROR.TOO_MANY_REQUESTS - 429: 너무 많은 요청
 * @property {number} CLIENT_ERROR.REQUEST_HEADER_FIELDS_TOO_LARGE - 431: 요청 헤더 필드가 너무 큼
 * @property {number} CLIENT_ERROR.UNAVAILABLE_FOR_LEGAL_REASONS - 451: 법적 이유로 이용 불가
 *
 * @property {Object} SERVER_ERROR - 5xx: 서버 오류
 * @property {number} SERVER_ERROR.INTERNAL_SERVER_ERROR - 500: 내부 서버 오류
 * @property {number} SERVER_ERROR.NOT_IMPLEMENTED - 501: 구현되지 않음
 * @property {number} SERVER_ERROR.BAD_GATEWAY - 502: 잘못된 게이트웨이
 * @property {number} SERVER_ERROR.SERVICE_UNAVAILABLE - 503: 서비스 이용 불가
 * @property {number} SERVER_ERROR.GATEWAY_TIMEOUT - 504: 게이트웨이 시간 초과
 * @property {number} SERVER_ERROR.HTTP_VERSION_NOT_SUPPORTED - 505: 지원되지 않는 HTTP 버전
 * @property {number} SERVER_ERROR.VARIANT_ALSO_NEGOTIATES - 506: 변형도 협상됨
 * @property {number} SERVER_ERROR.INSUFFICIENT_STORAGE - 507: 저장소 부족
 * @property {number} SERVER_ERROR.LOOP_DETECTED - 508: 루프 감지됨
 * @property {number} SERVER_ERROR.NOT_EXTENDED - 510: 확장되지 않음
 * @property {number} SERVER_ERROR.NETWORK_AUTHENTICATION_REQUIRED - 511: 네트워크 인증 필요
 */

/** @type {StatusCodes} */
const STATUS_CODES = {
  INFORMATIONAL: {
    CONTINUE: 100,
    SWITCHING_PROTOCOLS: 101,
    PROCESSING: 102,
    EARLY_HINTS: 103,
  },
  SUCCESS: {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NON_AUTHORITATIVE_INFORMATION: 203,
    NO_CONTENT: 204,
    RESET_CONTENT: 205,
    PARTIAL_CONTENT: 206,
    MULTI_STATUS: 207,
    ALREADY_REPORTED: 208,
    IM_USED: 226,
  },
  REDIRECTION: {
    MULTIPLE_CHOICES: 300,
    MOVED_PERMANENTLY: 301,
    FOUND: 302,
    SEE_OTHER: 303,
    NOT_MODIFIED: 304,
    USE_PROXY: 305,
    TEMPORARY_REDIRECT: 307,
    PERMANENT_REDIRECT: 308,
  },
  CLIENT_ERROR: {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    PAYMENT_REQUIRED: 402,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    NOT_ACCEPTABLE: 406,
    PROXY_AUTHENTICATION_REQUIRED: 407,
    REQUEST_TIMEOUT: 408,
    CONFLICT: 409,
    GONE: 410,
    LENGTH_REQUIRED: 411,
    PRECONDITION_FAILED: 412,
    PAYLOAD_TOO_LARGE: 413,
    URI_TOO_LONG: 414,
    UNSUPPORTED_MEDIA_TYPE: 415,
    RANGE_NOT_SATISFIABLE: 416,
    EXPECTATION_FAILED: 417,
    IM_A_TEAPOT: 418,
    MISDIRECTED_REQUEST: 421,
    UNPROCESSABLE_ENTITY: 422,
    LOCKED: 423,
    FAILED_DEPENDENCY: 424,
    TOO_EARLY: 425,
    UPGRADE_REQUIRED: 426,
    PRECONDITION_REQUIRED: 428,
    TOO_MANY_REQUESTS: 429,
    REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
    UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  },
  SERVER_ERROR: {
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
    HTTP_VERSION_NOT_SUPPORTED: 505,
    VARIANT_ALSO_NEGOTIATES: 506,
    INSUFFICIENT_STORAGE: 507,
    LOOP_DETECTED: 508,
    NOT_EXTENDED: 510,
    NETWORK_AUTHENTICATION_REQUIRED: 511,
  },
};

module.exports = STATUS_CODES;
