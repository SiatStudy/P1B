/**
 * 이메일 주소가 유효한 형식인지 검사하는 함수
 * @param {string} email - 검사할 이메일 주소
 * @returns {string|boolean} 이메일 주소가 유효한 형식이면 해당 이메일 주소를 반환하고, 그렇지 않으면 false를 반환합니다.
 */
const isEmailPattern = (email) => {
    // 이메일 주소가 유효한 형식인지 검사하는 정규식 패턴입니다.
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // 정규식 패턴을 사용하여 이메일 주소가 유효한 형식인지 확인합니다.
    // 유효한 형식이면 해당 이메일 주소를 반환하고, 그렇지 않으면 false를 반환합니다.
    return emailPattern.test(email) ? email : false;
};

export { isEmailPattern };