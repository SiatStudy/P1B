import {isEventObjBack} from "../validation/isEventObjBack";

/**
 * 백엔드에서 받아온 이벤트 객체를 프론트엔드에서 사용하기 위한 객체로 변환하는 함수
 * @param {Object} event - 백엔드에서 받아온 이벤트 객체
 * @returns {Object} 프론트엔드에서 사용할 수 있는 형식의 이벤트 객체를 반환합니다.
 */
export const objFromBack = (event) => {
    // 백엔드에서 받아온 이벤트 객체를 프론트엔드에서 사용할 수 있는 형식으로 변환합니다.
    const getObj = isEventObjBack(event);

    return {
        id: getObj.id,
        title: getObj.title,
        extendedProps: {
            eventContent: getObj.content
        },
        start: getObj.startDate.split("T")[0],
        end: getObj.endDate.split("T")[0],
        constraint: {
            startTime: getObj.startDate.split("T")[1],
            endTime: getObj.endDate.split("T")[1]
        },
        state: getObj.status === 1
    };
}