/**
 * 문자열 유효성 검사 함수
 * @param {any} val - 검사할 값
 * @returns {boolean} - 값이 문자열이면 true, 그렇지 않으면 false를 반환합니다.
 */
const isString = (val) => {
    if (!(typeof val === 'string')) {
        throw new Error('[ERROR] This value is not a string.');
    }

    return true;
}

export { isString };