import { isEventObjFront } from "../validation/isEventObjFront";

/**
 * 프론트엔드에서 받아온 이벤트 객체를 백엔드로 전송하기 위한 객체로 변환하는 함수
 * @param {Object} event - 프론트엔드에서 받아온 이벤트 객체
 * @returns {Object} 백엔드로 전송할 수 있는 형식의 이벤트 객체를 반환합니다.
 */
export const objToBack = (event) => {
    // 프론트엔드에서 받아온 이벤트 객체를 백엔드로 전송할 수 있는 형식으로 변환합니다.
    const sendObj = isEventObjFront(event);

    return {
        id: sendObj.id,
        title: sendObj.title,
        content: sendObj.extendedProps.eventContent,
        startDate: `${sendObj.start}T${sendObj.constraint.startTime}`,
        endDate: `${sendObj.end}T${sendObj.constraint.endTime}`,
        status: sendObj.state ? 1 : 0
    };
}
