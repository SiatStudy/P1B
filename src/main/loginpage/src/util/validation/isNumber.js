/**
 * 숫자인지 검사하는 함수
 * @param {any} val - 검사할 값
 * @returns {boolean} - 숫자이면 true를 반환하고, 숫자가 아니면 에러를 던집니다.
 * @throws {Error} - 값이 숫자가 아닌 경우 에러를 던집니다.
 */
const isNumber = (val) => {
    if (!(typeof val === 'number')) {
        throw new Error('[ERROR] This value is not a number.');
    }

    return true;
};

export { isNumber };