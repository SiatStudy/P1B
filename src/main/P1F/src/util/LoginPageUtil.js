import CustomLoginPageP from '../component/CustomLoginPageP';
import {searchUserData} from '../apis/apis';

const idRegex = /^[A-Za-z0-9]{3,8}$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
const emailRegex = /^[A-Za-z0-9]{1,63}$/;
const nicknameRegex = /^[A-Za-zㄱ-ㅎㅏ-ㅣ가-힣]{1,15}$/;
const emailCodeRegex = /^[0-9]{8}$/

export const handleInputsVal = (value, setIsVaild, pwVal, setErrorMessage, setButtons, setSignInputs, mode) => {
    if(mode === 'id'){
        setSignInputs((prevState) => {return {...prevState, userName : value}});
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
        setSignInputs((prevState) => {return {...prevState, userNickname : value}});
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
        setSignInputs((prevState) => {return {...prevState, userPw : value}});
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
        setSignInputs((prevState) => {return {...prevState, userConfirmPw : value}});
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
        setSignInputs((prevState) => {return {...prevState, userEmail : value}});
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
        setSignInputs((prevState) => {return {...prevState, userEmailCode : value}});
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

export const handleBtnClickEvent = (sInputs, setIsVaild, mode, setButtons, setSignInputs, setErrorMessage) => {
    const userName = sInputs.userName;
    const userEmail = sInputs.userEmail+sInputs.userEmailDomain;
    const userEmailCode = sInputs.userEmailCode;
    const userData = {
        address : userEmail,
        title : '',
        content : '',
    }

    if(mode === 'id'){
        setErrorMessage((prevState) => ({...prevState, idError : setIdError()}));

        const setIdError = () => {
            if (searchUserData("http://localhost:8080/api/login/duple/id", userName, mode)) {
                setButtons((prevState) => ({...prevState, checkDuplicateIdButton: true}));
                setIsVaild((prevState) => ({...prevState, checkId : true}));
                return <CustomLoginPageP $errorMessage $resultMessage>중복 확인이 완료되었습니다.</CustomLoginPageP>;
            }else{
                setButtons((prevState) => ({...prevState, checkDuplicateIdButton: true}));
                setIsVaild((prevState) => ({...prevState, checkId : false}));
                return <CustomLoginPageP $errorMessage>중복된 아이디 입니다. 다시 입력해 주세요.</CustomLoginPageP>
            }
        }
    }else if(mode === 'email'){
        setErrorMessage((prevState) => ({...prevState, emailError : setEmailError()}));

        const setEmailError = () => {
            if (searchUserData("http://localhost:8080/api/login/duple/email", userData, mode)) {
                setButtons((prevState) => ({...prevState, sendEmailVerificationButton: true}));
                setButtons((prevState) => ({...prevState, verifyEmailCodeButton: false}));
                setIsVaild((prevState) => ({...prevState, checkEmail : true}));
                return <CustomLoginPageP $errorMessage $resultMessage>인증코드가 발송 되었습니다.</CustomLoginPageP>
            }else{
                setButtons((prevState) => ({...prevState, sendEmailVerificationButton: true}));
                setButtons((prevState) => ({...prevState, verifyEmailCodeButton: true}));
                setIsVaild((prevState) => ({...prevState, checkEmail : false}));
                return <CustomLoginPageP $errorMessage>중복된 이메일 입니다. 다시 입력해 주세요.</CustomLoginPageP>
            }
        }
    }else if(mode === 'emailCode'){
        setErrorMessage((prevState) => ({...prevState, emailCodeError : setEmailCodeError()}));

        const setEmailCodeError = () => {
            if (searchUserData("http://localhost:8080/api/mail/check", userEmailCode, mode)) {
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