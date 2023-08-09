import errorFunc from "../../../../P1F/src/util/errorFunc.js";

/**
 * 이벤트 객체가 유효한 형식인지 검사하는 함수
 * @param {object} state - 검사할 이벤트 객체
 * @returns {object} 유효한 형식인 이벤트 객체를 반환합니다.
 * @throws {Error} 이벤트 객체가 유효하지 않은 경우 에러를 발생시킵니다.
 */
const isEventObjFront = (state) => {
    // 이벤트 객체의 각 키와 해당 키의 자료형, 유효성 검사 함수, 날짜 형식을 정의한 객체입니다.
    const objKeys = {
        id: { type: 'number' },
        title: { type: 'string' },
        extendedProps: { type: 'object', validator: validateExtended },
        start: { type: 'string', validator: validateDateFormat, dateFormat: "YYYY-MM-DD" },
        end: { type: 'string', validator: validateDateFormat, dateFormat: "YYYY-MM-DD" },
        constraint: { type: 'object', validator: validateConstraint },
        state: { type: 'boolean' }
    };

    // 이벤트 객체의 각 키에 대해 유효성 검사를 수행합니다.
    for (const key in objKeys) {
        const { type, validator, dateFormat } = objKeys[key];

        // 자료형이 잘못되었을 경우 에러를 발생시킵니다.
        if (typeof state[key] !== type) {
            errorFunc('isEventObjFront', `${key}의 자료형이 잘못되었습니다.`);
        } else if (validator) {
            // 유효성 검사 함수가 정의되어 있고, 해당 키가 "start" 또는 "end"일 경우에는 날짜 형식 검사를 수행합니다.
            if (key === "start" || key === "end") {
                validator(state[key], dateFormat, key);
            } else {
                // 그 외의 경우, 해당 키에 대한 별도의 유효성 검사 함수를 호출합니다.
                validator(state[key], key);
            }
        }
    }

    // 모든 유효성 검사를 통과한 이벤트 객체를 반환합니다.
    return state;
};

/**
 * 이벤트 객체의 extendedProps를 검사하는 함수
 * @param {object} state - 검사할 이벤트 객체의 extendedProps
 * @param {string} parentKey - 부모 키 이름 (start 또는 end)
 * @throws {Error} extendedProps의 eventContent 값이 잘못된 경우 에러를 발생시킵니다.
 */
const validateExtended = (state, parentKey) => {
    // extendedProps 내의 eventContent 키의 자료형이 "string"이 아닌 경우 에러를 발생시킵니다.
    if (typeof state["eventContent"] !== "string") {
        errorFunc('validateExtended', `${parentKey}의 eventContent 값의 자료형이 잘못되었습니다.`);
    }
};

/**
 * 이벤트 객체의 constraint를 검사하는 함수
 * @param {object} state - 검사할 이벤트 객체의 constraint
 * @param {string} parentKey - 부모 키 이름 (start 또는 end)
 * @throws {Error} constraint의 startTime 또는 endTime 값의 자료형이 잘못된 경우 에러를 발생시킵니다.
 */
const validateConstraint = (state, parentKey) => {
    // constraint 내의 각 키와 해당 키의 자료형, 날짜 형식을 정의한 객체입니다.
    const objKey = {
        startTime: { type: "string", format: "hh:mm" },
        endTime: { type: "string", format: "hh:mm" }
    };

    // constraint 내의 각 키에 대해 유효성 검사를 수행합니다.
    for (const key in objKey) {
        const { type, format } = objKey[key];

        // 자료형이 잘못되었을 경우 에러를 발생시킵니다.
        if (typeof state[key] !== type) {
            errorFunc('validateConstraint', `${parentKey}의 ${key} 값의 자료형이 잘못되었습니다.`);
        } else if (format) {
            // 날짜 형식 검사 함수를 호출하여 startTime 또는 endTime 값의 형식이 올바른지 검사합니다.
            validateDateFormat(state[key], format, `${parentKey}의 ${key}`);
        }
    }
};

/**
 * 날짜 형식을 검사하는 함수
 * @param {string} dateString - 검사할 날짜 문자열
 * @param {string} format - 기대하는 날짜 형식 (예: "YYYY-MM-DD")
 * @param {string} parentKey - 부모 키 이름 (start 또는 end)
 * @throws {Error} dateString이 기대하는 형식과 다른 경우 에러를 발생시킵니다.
 */
const validateDateFormat = (dateString, format, parentKey) => {
    // 주어진 dateString을 Date 객체로 파싱합니다.
    const parsedDate = new Date(dateString);

    // Date 객체가 유효하고 파싱된 날짜의 형식이 기대하는 형식과 일치하지 않으면 에러를 발생시킵니다.
    if (parsedDate instanceof Date && !isNaN(parsedDate) && parsedDate.toISOString().slice(0, 10) !== dateString) {
        errorFunc('validateDateFormat', `${parentKey}의 형식이 올바르지 않습니다. (올바른 형식: ${format})`);
    }
};


export { isEventObjFront };