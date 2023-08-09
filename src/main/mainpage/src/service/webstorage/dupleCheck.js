import errorFunc from "../../util/errorFunc";

/**
 * 중복 체크 함수
 * @param {string} key 중복을 확인할 때 사용할 sessionStorage의 키(Key).
 * @param {string} data 중복을 확인하고자 하는 데이터.
 * @returns {boolean} 중복 여부에 따라 true 또는 false를 반환합니다.
 */
const dupleCheck = (key, data) => {
    // 1. sessionStorage에서 key에 해당하는 데이터를 가져옵니다.
    const dupleData = sessionStorage.getItem(key);

    // 2. 가져온 데이터와 data를 비교하여 동일한 경우, 즉 중복된 데이터인 경우 false를 반환합니다.
    if (dupleData === data) {
        return false;
    }
    // 3. 가져온 데이터와 data가 다른 경우, 즉 새로운 데이터인 경우 sessionStorage에 key와 data를 저장하고 true를 반환합니다.
    else if (dupleData !== data) {
        sessionStorage.setItem(key, data);
        return true;
    }
    // 4. 만약 sessionStorage에서 데이터를 가져오는 과정에서 오류가 발생하면 errorFunc 함수를 호출하여 에러를 처리합니다.
    else {
        errorFunc('dupleCheck', 'Failed to get sessionData');
    }
};

export default { dupleCheck };