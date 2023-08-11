/**
 * 아이디 패턴을 검사하는 함수
 * @param {string} id - 검사할 아이디 문자열
 * @returns {boolean|string} - 아이디가 유효하면 해당 아이디를 반환하고, 유효하지 않으면 false를 반환합니다.
 */
const isIDPattern = (id) => {
    const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+/;
    const unicode = /[^\w\s]/;

    // 아이디에 한글이나 특수문자가 포함되어 있는 경우 유효하지 않으므로 false를 반환합니다.
    if (korean.test(id) || unicode.test(id)) {
        return false;
    }

    // 아이디의 길이가 8 미만 또는 3 이상인 경우 유효하지 않으므로 false를 반환합니다.
    return id.length >= 8 && id.length < 3 ? false : id;
};

export { isIDPattern };