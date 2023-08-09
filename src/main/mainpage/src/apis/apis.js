import axios from 'axios';
import { useDispatch } from "react-redux";

import errorFunc from '../util/errorFunc';
import { userLogin, userEmailReturn } from '../store/userLogin';

/**
 * 로그인 및 중복 데이터 확인을 처리하는 함수
 * @param {string} url - API 요청에 사용되는 URL입니다.
 * @param {Object} userData - {
 *     login인 경우 : {
 *         userData : {
 *             id : "example",
 *             password : "example"
 *         }
 *     },
 *     duple인 경우 (id 중복 확인) : {
 *         userData : {
 *             id : "example"
 *         }
 *     },
 *     duple인 경우 (email 중복 확인) : {
 *         userData : {
 *             email : "example123@example.com"
 *         }
 *     }
 * }
 * @param {string} mode - 액션을 나타내는 모드 (예: "login" 또는 "duple")입니다.
 * @returns {Promise} - 액션 결과 또는 오류 객체가 반환되는 Promise 객체입니다.
 */
const login = async ( url, userData, mode ) => {
    // react-redux의 dispatch 함수를 가져옵니다.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch = useDispatch();

    // 로그인 기능
    if (mode === "login") {
        try {
            const res = await axios.post(url, userData);

            if (res.data.message) {
                // 로그인이 성공적으로 이루어졌을 때, Redux 액션을 사용하여 유저 정보를 업데이트합니다.
                dispatch(userLogin(document.cookie));
                // 로그인된 유저의 이메일 정보를 Redux로 반환합니다.
                return dispatch(userEmailReturn());
            } else {
                // 로그인 실패 시, 오류 메시지를 가진 오류 객체를 반환합니다.
                return { error: '로그인 실패' };
            }
        } catch (err) {
            // 에러 핸들링을 위해 errorFunc 유틸리티를 사용합니다.
            errorFunc('loginAxios', err);
        }
    } else if (mode === "duple") {
        // 중복 데이터 확인 기능
        if (userData.id) {
            try {
                const res = await axios.post(url, userData);
                return res.data.isDuplicated;
            } catch (err) {
                // 에러 핸들링을 위해 errorFunc 유틸리티를 사용합니다.
                errorFunc('dupleIdAxios', err);
            }
        } else {
            // userData.id가 falsy하거나 제공되지 않은 경우에는 이메일 중복을 확인합니다.
            try {
                const res = await axios.post(url, userData);
                return res.data.isDuplicated;
            } catch (err) {
                // 에러 핸들링을 위해 errorFunc 유틸리티를 사용합니다.
                errorFunc('dupleEmailAxios', err);
            }
        }
    }
};

/**
 * 사용자 정보 검색 함수
 * @param {string} url - 서버 URL
 * @param {Object} userData - {
 *     id인 경우 : {
 *         userData : {
 *             id : "example"
 *         }
 *     },
 *     password인 경우 (pw 중복 확인) : {
 *         userData : {
 *             id : "example",
 *             email : "example123@example.com"
 *         }
 *     }
 * }
 * @param {string} mode - 검색 모드 ("id" 또는 "pw")
 * @returns {Promise} Promise 객체를 반환하며, 아이디 검색 시 아이디를, 비밀번호 검색 시 true를 반환합니다.
 */

const searchUserData = async ( url, userData, mode ) => {
    // 유저 데이터 검색을 담당하는 함수 (아이디 또는 비밀번호로 검색)
    if (mode === "id") {
        // 아이디로 검색
        axios.post(url, userData)
            .then(res => {
                if (res.data.exists) {
                    // 아이디가 존재하면 해당 아이디 반환, 없으면 false 반환
                    return res.data.id;
                } else {
                    return false;
                }
            })
            .catch(err => {
                // 에러 핸들링을 위해 errorFunc 유틸리티 사용
                errorFunc('searchIDAxios', err);
            })
    } else if (mode === "pw") {
        // 비밀번호로 검색
        axios
            .post(url, userData)
            .then(res => {
                // 비밀번호 데이터가 존재하면 true 반환, 없으면 false 반환
                return !!res.data.passwordData;
            })
            .catch(err => {
                // 에러 핸들링을 위해 errorFunc 유틸리티 사용
                errorFunc('searchPWAxios', err);
            });
    } else {
        // 잘못된 모드 문자열 처리
        errorFunc('searchUserAxios', 'wrong mode String');
    }
};

/**
 * 회원 가입 또는 사용자 정보 업데이트 함수
 * @param {string} url - 서버 URL
 * @param {Object} userData - {
 *     signup인 경우 : {
 *         userData : {
 *             id : "example",
 *             password : "example",
 *             email : "example123@example.com",
 *             name : "nicknameExample"
 *         }
 *     },
 *     info인 경우 : {
 *         userData : {
 *             id : "example",
 *             password : "example"
 *         }
 *     }
 * }
 * @param {string} mode - 실행 모드 ("signup" 또는 "info")
 * @returns {Promise} Promise 객체를 반환하며, 회원 가입 성공 시 true를 반환합니다.
 */

const signup = async ( url, userData, mode ) => {
    // 회원가입 또는 유저 정보 업데이트를 담당하는 함수
    if (mode === "signup") {
        // 회원가입
        axios.post(url, userData)
            .then(res => {
                if (res.data.registration) {
                    // 회원가입이 실패하면 false 반환
                    return false;
                }
            })
            .catch(err => {
                // 에러 핸들링을 위해 errorFunc 유틸리티 사용
                errorFunc('signupAxios', err);
            });
    } else if (mode === "info") {
        // 유저 정보 업데이트
        axios.patch(url, userData)
            .then(res => {
                // 정보 업데이트가 성공하면 true 반환, 실패하면 false 반환
                return !!res.data.updateStatus;
            })
            .catch(err => {
                // 에러 핸들링을 위해 errorFunc 유틸리티 사용
                errorFunc('infoAxios', err);
            });
    } else {
        // 잘못된 모드 문자열 처리
        errorFunc('signupAxios', 'wrong mode String');
    }
};

/**
 * Todo 데이터 조작 함수
 * @param {string} url - 서버 URL
 * @param {Object} userData - {
 *     general인 경우 : {
 *         userData : {
 *             sectionId : "example",
 *             yDate : "2023"
 *         }
 *     },
 *     remove인 경우 : {
 *         userData : {
 *              "id": "abcd1234",
 *              "title": "exampleTitle",
 *              "content": "exampleContent",
 *              "startDate": "2023-07-17T10:00:00",
 *              "endDate": "2023-07-17T16:00:00",
 *              "status": 1
 *         }
 *     },
 *     add인 경우 : {
 *         userData : {
 *             "id": "abcd1234",
 *             "title": "아 아무것도 하기 싫당",
 *             "content": "오늘은 아무것도 안했당",
 *             "startDate": "2023-07-17T10:00:00",
 *             "endDate": "2023-07-17T16:00:00",
 *             "status": 0
 *         }
 *     },
 *     delete인 경우 : {
 *         userData : {
 *             sectionId : "example",
 *             tdId : example (int)
 *         }
 *     }
 * }
 * @param {string} mode - 실행 모드 ("general", "remove", "add", "delete")
 * @returns {Promise} Promise 객체를 반환하며, 조회 또는 성공 시 해당 결과를 반환합니다.
 */

const todoData = async ( url, userData, mode ) => {
    // Todo 데이터 조작을 담당하는 함수
    if (mode === "general") {
        // Todo 데이터 조회
        try {
            const response = await axios.get(url, userData);
            if (response.data.success) {
                // 조회된 데이터를 반환
                return response.data.content;
            } else {
                // 데이터 조회 실패 시 false 반환
                return false;
            }
        } catch (error) {
            // 에러 핸들링을 위해 errorFunc 유틸리티 사용
            errorFunc('todoGetAxios', error);
        }
    } else if (mode === "remove") {
        // Todo 아이템 삭제
        try {
            const response = await axios.patch(url, userData);
            // 삭제 성공 시 true 반환, 실패 시 false 반환
            return !!response.data.success;
        } catch (error) {
            // 에러 핸들링을 위해 errorFunc 유틸리티 사용
            errorFunc('todoPatchAxios', error);
        }
    } else if (mode === "add") {
        // Todo 아이템 추가
        try {
            const response = await axios.post(url, userData);
            // 추가 성공 시 true 반환, 실패 시 false 반환
            return !!response.data.createStatus;
        } catch (error) {
            // 에러 핸들링을 위해 errorFunc 유틸리티 사용
            errorFunc('todoPostAxios', error);
        }
    } else if (mode === 'delete') {
        // Todo 데이터 삭제
        try {
            const response = await axios.delete(url, userData);
            // 삭제 성공 시 true 반환, 실패 시 false 반환
            return !!response.data.deleteStatus;
        } catch (error) {
            // 에러 핸들링을 위해 errorFunc 유틸리티 사용
            errorFunc('todoDeleteAxios', error);
        }
    } else {
        // 잘못된 모드 문자열 처리
        errorFunc('todoAxios', 'wrong mode String');
    }
};

export { login, searchUserData, signup, todoData };