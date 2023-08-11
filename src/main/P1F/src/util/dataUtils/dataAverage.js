import { useDispatch } from "react-redux";

import { resetYear, returnYear } from "../../store/selectedYear";
import { useSectionReturn } from "../../store/userLogin";
import todoData from "../../apis/apis"
import errorFunc from "../errorFunc";

//axios get params

/**
 * 데이터 평균값 계산 함수
 * @returns {number} 데이터의 평균값을 반환합니다.
 */
export const dataAverage = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch = useDispatch();

    // 선택된 연도를 초기화합니다.
    dispatch(resetYear());

    // 현재 선택된 연도를 가져옵니다.
    const currentYear = dispatch(returnYear());
    const Data = {params:
        {sectionId : dispatch(useSectionReturn),
        yDate : currentYear}
    }

    // 선택된 연도에 해당하는 데이터를 가져옵니다.
    return new Promise(todoData(process.env.REACT_APP_LOCAL_URL + '/todos', Data)
        .then(({ data }) => {
            let count = 0; // 'state'가 true인 데이터의 개수를 저장하는 변수

            // 데이터가 배열인 경우에만 처리합니다.
            if (Array.isArray(data)) {
                // 각 데이터를 순회하면서 'state'가 true인 경우 count를 증가시킵니다.
                data.forEach(item => {
                    if (item && item.state === true) {
                        count++;
                    }
                });
            }

            // 데이터의 평균값을 계산하여 반환합니다.
            return count / data.length;
        })
        .catch(err => {
            errorFunc('dataAverage', err);
        }));
}