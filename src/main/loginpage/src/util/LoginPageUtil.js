import CustomLoginPageP from '../component/CustomLoginPageP';
// import {searchUserData} from '../apis/apis';
import axios from "axios";
import errorFunc from '../util/errorFunc';

const idRegex = /^[A-Za-z0-9]{3,8}$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
const emailRegex = /^[A-Za-z0-9]{1,63}$/;
const nicknameRegex = /^[A-Za-zㄱ-ㅎㅏ-ㅣ가-힣]{1,15}$/;
const emailCodeRegex = /^[0-9]{8}$/;

export const handleInputsVal = (value, setIsVaild, pwVal, setErrorMessage, setButtons, setSignInputs, mode) => {
    if(mode === 'id'){
        setSignInputs((prevState) => {return {...prevState, username : value}});
        setErrorMessage((prevState) => ({...prevState, idError : setIdError(value)}));

        const setIdError = () => {
            if (value.trim() === "" || !idRegex.test(value)) {
                setButtons((prevState) => ({...prevState, checkDuplicateIdButton: true}));
                return <CustomLoginPageP $errorMessage>아이디: 3~8자의 영문 대/소문자 또는 숫자를 사용해 주세요.</CustomLoginPageP>;
            } else {
                setButtons((prevState) => ({...prevState, checkDuplicateIdButton: false}));
                return '';
            }
        }
    }else if(mode === 'nickname'){
        setSignInputs((prevState) => {return {...prevState, usernickname : value}});
        setErrorMessage((prevState) => ({...prevState, nicknameError : setNicknameError(value)}));
    
        const setNicknameError = () => {
            if (value.trim() === "" || !nicknameRegex.test(value)) {
                setIsVaild((prevState) => ({...prevState, checkNickname : false}));
                return <CustomLoginPageP $errorMessage>닉네임: 15자 이하의 영문 대/소문자 또는 한글을 사용해 주세요.</CustomLoginPageP>;
            } else {
                setIsVaild((prevState) => ({...prevState, checkNickname : true}));
                return '';
            }
        }
    }else if (mode === 'pw'){
        setSignInputs((prevState) => {return {...prevState, userpassword : value}});
        setErrorMessage((prevState) => ({...prevState, pwError : setPwError(value)}));
    
        const setPwError = () => {
            if (value.trim() === "" || !passwordRegex.test(value)) {
                setIsVaild((prevState) => ({...prevState, checkPw : false}));
                return <CustomLoginPageP $errorMessage>비밀번호: 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.</CustomLoginPageP>;
            } else {
                setIsVaild((prevState) => ({...prevState, checkPw : true}));
                return '';
            }
        }
    }else if (mode === 'confirmPw'){
        setSignInputs((prevState) => {return {...prevState, userpasswordchk : value}});
        setErrorMessage((prevState) => ({...prevState, confirmPwError : setConfirmPwError(value)}));

        const setConfirmPwError = () => {
            if(value.trim() === "" || pwVal !== value){
                setIsVaild((prevState) => ({...prevState, checkConfirmPw : false}));
                return <CustomLoginPageP $errorMessage>비밀번호랑 동일하게 입력해주세요.</CustomLoginPageP>;
            } else{
                setIsVaild((prevState) => ({...prevState, checkConfirmPw : true}));
                return '';
            }
        }
    }else if (mode === 'email'){
        setSignInputs((prevState) => {return {...prevState, useremail : value}});
        setErrorMessage((prevState) => ({...prevState, emailError : setEmailError(value)}));

        const setEmailError = () => {
            if (value.trim() === "" || !emailRegex.test(value)) {
                setButtons((prevState) => ({...prevState, sendEmailVerificationButton: true}));
                return <CustomLoginPageP $errorMessage>이메일: 63자이하의 영문 대/소문자, 숫자를 사용해 주세요.</CustomLoginPageP>;
            } else {
                setButtons((prevState) => ({...prevState, sendEmailVerificationButton: false}));
            }
        }
    }else if (mode === 'emailCode'){
        setSignInputs((prevState) => {return {...prevState, code : value}});
        setErrorMessage((prevState) => ({...prevState, emailCodeError : setEmailCodeError(value)}));

        const setEmailCodeError = () => {
            if (value.trim() === "" || !emailCodeRegex.test(value)) {
                setButtons((prevState) => ({...prevState, verifyEmailCodeButton: true}));
                return <CustomLoginPageP $errorMessage>인증코드는 숫자8자리 입니다.</CustomLoginPageP>;
            } else {  
                setButtons((prevState) => ({...prevState, verifyEmailCodeButton: false}));
                return '';
            }
        }
    }
};

export const handleBtnClickEvent = async (sInputs, setIsVaild, mode, setButtons, setSignInputs, setErrorMessage) => {
    const username = sInputs.username;
    const useremail = sInputs.useremail+sInputs.userEmailDomain;
    const code = sInputs.code;
    const userdata = {
        useremail : useremail,
        username : username
    }

    if(mode === 'id'){
        const checkduple = async () => {
            try {
                const res = await axios.post("http://localhost:8080/api/login/duple/id", { username: username });
                return res.data.isValid;
            } catch (err) {
                // 에러 핸들링을 위해 errorFunc 유틸리티 사용
                errorFunc('dupleAxios', err);
                return false;
            }
        };

        const isVal = await checkduple();
        console.log(isVal);
        setErrorMessage((prevState) => ({...prevState, idError : setIdError()}));

        const setIdError = () => {
            console.log(isVal);
            if (isVal) {
                setButtons((prevState) => ({...prevState, checkDuplicateIdButton: true}));
                setIsVaild((prevState) => ({...prevState, checkId : true}));
                setButtons((prevState) => ({...prevState, sendEmailVerificationButton: false}));
                return <CustomLoginPageP $errorMessage $resultMessage>중복 확인이 완료되었습니다.</CustomLoginPageP>;
            }else{
                setButtons((prevState) => ({...prevState, checkDuplicateIdButton: true}));
                setIsVaild((prevState) => ({...prevState, checkId : false}));
                setButtons((prevState) => ({...prevState, sendEmailVerificationButton: true}));
                return <CustomLoginPageP $errorMessage>중복된 아이디 입니다. 다시 입력해 주세요.</CustomLoginPageP>
            }
        }
    }
    else if(mode === 'email'){
        async function emailduplesend() {
            try {
                const [isValduple, isValsend] = await Promise.all([
                    axios.post("http://localhost:8080/api/login/duple/email", { useremail: useremail })
                        .then(res => res.data.isValid)
                        .catch(err => {
                            errorFunc('dupleAxios', err);
                            return false;
                        }),

                    axios.post("http://localhost:8080/api/mali/send", { userdata: userdata })
                        .then(res => res.data.isValid)
                        .catch(err => {
                            errorFunc('sendAxios', err);
                            return false;
                        })
                ]);

                const emailErrorMessage = setEmailError(isValduple, isValsend);
                setErrorMessage((prevState) => ({ ...prevState, emailError: emailErrorMessage }));
            } catch (err) {
                // 에러 핸들링
                errorFunc('duplesendAxios', err);
            }
        }

        function setEmailError(isValduple, isValsend) {
            if (isValduple && isValsend) {
                setButtons((prevState) => ({
                    ...prevState,
                    sendEmailVerificationButton: true,
                    verifyEmailCodeButton: false
                }));
                setIsVaild((prevState) => ({ ...prevState, checkEmail: true }));
                return <CustomLoginPageP $errorMessage $resultMessage>인증코드가 발송 되었습니다.</CustomLoginPageP>;
            } else {
                setButtons((prevState) => ({
                    ...prevState,
                    sendEmailVerificationButton: true,
                    verifyEmailCodeButton: true
                }));
                setIsVaild((prevState) => ({ ...prevState, checkEmail: false }));
                return <CustomLoginPageP $errorMessage>중복된 이메일 입니다. 다시 입력해 주세요.</CustomLoginPageP>;
            }
        }
        // async 함수 호출
        emailduplesend();
    } else if(mode === 'emailCode'){
        const isVal =  axios.post("http://localhost:8080/api/mail/check", {code : code})
        .then(res => {
            if(res.data.isValid){
                return true;
            }else{
                return false;
            }
        })
        .catch(err => {
            // 에러 핸들링을 위해 errorFunc 유틸리티 사용
            errorFunc('dupleAxios', err)
        });

        setErrorMessage((prevState) => ({...prevState, emailCodeError : setEmailCodeError()}));

        const setEmailCodeError = () => {
            if (isVal) {
                setButtons((prevState) => ({...prevState, verifyEmailCodeButton: true}));
                setIsVaild((prevState) => ({...prevState, checkEmailCode : true})); 
                return <CustomLoginPageP $errorMessage $resultMessage>인증이 완료 되었습니다.</CustomLoginPageP>
            }else{
                setButtons((prevState) => ({...prevState, verifyEmailCodeButton: true}));
                setIsVaild((prevState) => ({...prevState, checkEmailCode : false}));
                return <CustomLoginPageP $errorMessage>인증 코드가 맞지 않습니다. 다시 입력해 주세요.</CustomLoginPageP>
            }
        }
    }
}