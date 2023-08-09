import errorFunc from "../../../../P1F/src/util/errorFunc";

/**
 * 이벤트 객체가 유효한 형식인지 검사하는 함수
 * @param {object} state - 검사할 이벤트 객체
 * @returns {object} 유효한 형식인 이벤트 객체를 반환합니다.
 * @throws {Error} 이벤트 객체가 유효하지 않은 경우 에러를 발생시킵니다.
 */
const isEventObjBack = (state) => {
    // 이벤트 객체의 각 키와 해당 키의 자료형, 유효성 검사 함수, 날짜 형식을 정의한 객체입니다.
    const objKeys = {
        id: { type: 'number' },
        title: { type: 'string' },
        content: { type: 'string' },
        startDate: { type: 'string', validator: validateDateFormat, dateFormat: "YYYY-MM-DDThh:mm" },
        endDate: { type: 'string', validator: validateDateFormat, dateFormat: "YYYY-MM-DDThh:mm" },
        status: { type: "number" }
    };

    // 이벤트 객체의 각 키에 대해 유효성 검사를 수행합니다.
    for (const key in objKeys) {
        const { type, validator, dateFormat } = objKeys[key];

        // 자료형이 잘못되었을 경우 에러를 발생시킵니다.
        if (typeof state[key] !== type) {
            errorFunc('isEventObjBack', `${key}의 자료형이 잘못되었습니다.`);
        } else if (validator) {
            // 유효성 검사 함수가 정의되어 있고, 해당 키가 "startDate" 또는 "endDate"일 경우에만 검사를 수행합니다.
            if (key === "startDate" || key === "endDate") {
                validator(state[key], dateFormat, key);
            }
        }
    }

    // 모든 유효성 검사를 통과한 이벤트 객체를 반환합니다.
    return state;
}

/**
 * 날짜 형식을 검사하는 함수
 * @param {string} dateString - 검사할 날짜 문자열
 * @param {string} format - 올바른 날짜 형식
 * @param {string} parentKey - 부모 키 이름 (startDate 또는 endDate)
 * @throws {Error} 날짜 형식이 올바르지 않은 경우 에러를 발생시킵니다.
 */
const validateDateFormat = (dateString, format, parentKey) => {
    const parsedDate = new Date(dateString);

    // 날짜 문자열이 올바른 형식의 날짜로 파싱되지 않은 경우 에러를 발생시킵니다.
    if (!(parsedDate instanceof Date) || isNaN(parsedDate) || parsedDate.toISOString().slice(0, 10) !== dateString) {
        errorFunc('validateDateFormat', `${parentKey}의 형식이 올바르지 않습니다. (올바른 형식: ${format})`);
    }
}

export { isEventObjBack };