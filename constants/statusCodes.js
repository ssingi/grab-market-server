/** HTTP 상태 코드 상수 */
module.exports = {
  /**
   * 통신 성공
   * - 2xx번
   */
  SUCCESS: {
    /**
     * 성공
     * - 200
     */
    OK: 200,

    /**
     * 생성됨
     * - 201
     */
    CREATED: 201,

    /**
     * 허용됨
     * - 202
     */
    ACCEPTED: 202,
  },

  /**
   * 클라이언트 에러
   * - 4xx번
   */
  CLIENT_ERROR: {
    /**
     * 잘못된 요청
     * - 400
     */
    BAD_REQUEST: 400,

    /**
     * 권한 없음
     * - 401
     */
    UNAUTHORIZED: 401,

    /**
     * 금지됨
     * - 403
     */
    FORBIDDEN: 403,

    /**
     * 찾을 수 없음
     * - 404
     */
    NOT_FOUND: 404,
  },

  /**
   * 서버 에러
   * - 5xx번
   */
  SERVER_ERROR: {
    /**
     * 서버 내부 오류
     * - 500
     */
    INTERNAL_SERVER_ERROR: 500,

    /**
     * 구현되지 않음
     * - 501
     */
    NOT_IMPLEMENTED: 501,

    /**
     * 불량 게이트웨이
     * - 502
     */
    BAD_GATEWAY: 502,
  },
};
