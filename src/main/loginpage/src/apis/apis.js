import axios from 'axios';
// import { useDispatch } from "react-redux";

import errorFunc from '../util/errorFunc';
// import { userLogin, userEmailReturn } from '../store/userLogin';


/**
 * 사용자 정보 검색 함수
 * @param {Object} options - 함수에 필요한 옵션 객체
 * @param {string} options.url - 서버 URL
 * @param {Object} options.userData - 사용자 데이터
 * @param {string} options.mode - 검색 모드 ("id" 또는 "pw")
 * @returns {Promise} Promise 객체를 반환하며, 아이디 검색 시 아이디를, 비밀번호 검색 시 true를 반환합니다.
 */

const searchUserData = async ({ url, userData, mode }) => {
    // 유저 데이터 검색을 담당하는 함수 (아이디 또는 비밀번호로 검색)
    if (mode === "id") {
        // 중복 데이터 확인 기능을 담당하는 함수
        axios.post(url, null, {params:{userData:userData}})
            .then(res => {
                // 중복 데이터가 있을 경우 true 반환, 없을 경우 false 반환
                if(res.status === 200){
                    return !!res.data.result;
                }
            })
            .catch(err => {
                // 에러 핸들링을 위해 errorFunc 유틸리티 사용
                errorFunc('dupleAxios', err)
            })
        }
        else if (mode === "email") {
        // 중복 데이터 확인 기능을 담당하는 함수
        axios.post(url, null, {params:{userData:userData}})
            .then(res => {
                // 중복 데이터가 있을 경우 true 반환, 없을 경우 false 반환
                if(res.status === 200){
                    return !!res.data.result;
                }
            })
            .catch(err => {
                // 에러 핸들링을 위해 errorFunc 유틸리티 사용
                errorFunc('dupleAxios', err)
            })
        }
        else if (mode === "emailCode") {
            // 중복 데이터 확인 기능을 담당하는 함수
            axios.post(url, null, {params:{userData:userData}})
                .then(res => {
                    // 중복 데이터가 있을 경우 true 반환, 없을 경우 false 반환
                    if(res.status === 200){
                        return !!res.data.result;
                    }
                })
                .catch(err => {
                    // 에러 핸들링을 위해 errorFunc 유틸리티 사용
                    errorFunc('dupleAxios', err)
                })
            }
        else {
        // 잘못된 모드 문자열 처리
        errorFunc('searchUserAxios', 'wrong mode String');
        }
};

const signup = async ({ url, userData, mode }) => {
    // 회원가입 또는 유저 정보 업데이트를 담당하는 함수
    if (mode === "signup") {
        // 회원가입
        axios.post(url, null, {params:{userData:userData}})
            .then(res => {
                if (res.status === 200) {
                    // 회원가입이 실패하면 false 반환
                    return false;
                }
            })
            .catch(err => {
                // 에러 핸들링을 위해 errorFunc 유틸리티 사용
                errorFunc('signupAxios', err);
            });
    }
}


export { searchUserData, signup };