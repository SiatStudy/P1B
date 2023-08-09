/**
 * 디바운스 함수
 * @param {function} callback 디바운스 적용할 콜백 함수.
 * @param {number} delay 디바운스 지연 시간 (밀리초).
 * @returns {function} 디바운스 처리된 콜백 함수를 반환합니다.
 */
export const debounce = (callback, delay) => {
    let timerId; // 타이머 ID를 저장하기 위한 변수

    // 디바운스 처리된 콜백 함수를 반환합니다.
    return event => {
        // 만약 이전에 설정한 타이머가 있다면 취소합니다.
        if (timerId) clearTimeout(timerId);

        // 새로운 타이머를 설정하여 일정 시간(delay) 이후에 콜백 함수를 실행합니다.
        // event 인자도 함께 전달합니다.
        timerId = setTimeout(callback, delay, event);
    };
};