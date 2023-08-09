/**
 * 비밀번호 유효성 검사 함수
 * @param {string} pw - 검사할 비밀번호
 * @returns {boolean} - 비밀번호가 유효하면 true, 그렇지 않으면 false를 반환합니다.
 */
const isPWPattern = (pw) => {
    const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+/;
    const unicode = /^[!@#$%]+$/;
    const english = /[a-zA-Z]/;
    const number = /[0-9]/;

    if (korean.test(pw) || /\s/.test(pw)) {
        return false;
    }

    if (!(unicode.test(pw) && english.test(pw) && number.test(pw))) {
        return false;
    }

    return pw.length >= 8;
};

export { isPWPattern };