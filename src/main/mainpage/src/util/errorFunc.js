/**
 * 에러 처리 함수
 * @param {string} locate - 에러 위치 또는 태그
 * @param {any} data - 에러 메시지나 정보
 * @throws {Error} - 지정된 에러 위치와 메시지를 가지고 에러를 던집니다.
 */
const errorFunc = (locate, data) => {
    throw new Error(`[${locate} ERROR] ${data}`);
};

export default errorFunc;