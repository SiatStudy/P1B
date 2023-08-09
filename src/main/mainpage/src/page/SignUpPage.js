import style from './LoginPage.module.css';
import CustomLoginPageDiv from "../component/CustomLoginPageDiv";
import CustomLoginPageInput from '../component/CustomLoginPageInput';
import CustomLoginPageLabel from '../component/CustomLoginPageLabel';
import CustomLoginPageBtn from '../component/CustomLoginPageBtn';
import CustomLoginPageSelect from '../component/CustomLoginPageSelect';
import { ReactComponent as Eyeline } from "../svg/Eyeline.svg";
import {handleInputsVal, handleBtnClickEvent} from "../util/LoginPageUtil";
import { useState, useEffect } from 'react';
import CustomLoginPageP from '../component/CustomLoginPageP';
import {signup} from '../apis/apis';
import {useNavigate} from 'react-router-dom';

function SignUpPage () {
    const navigate = useNavigate();
    const [timer, setTimer] = useState(5); // 초 단위로 타이머를 설정, 3분(180초)
    const [timerExpired, setTimerExpired] = useState(false); // 타이머 만료 state
    const [timerStarted, setTimerStarted] = useState(false); // 타이머 시작 state
    const [isVaild, setIsVaild] = useState({
        checkId : false,
        checkNickname : false,
        checkPw : false,
        checkConfirmPw : false,
        checkEmail : false,
        checkEmailCode : false
    });
    const [signInputs, setSignInputs] = useState({
        userName : '',
        userNickname : '',
        userPw : '',
        userConfirmPw : '',
        userEmail : '',
        userEmailDomain : '@naver.com',
        userEmailCode : '',
    });
    const [errorMessage, setErrorMessage] = useState({
        idError : '',
        nicknameError : '',
        pwError : '',
        confirmPwError : '',
        emailError : '',
        emailCodeError : ''
    })
    const [buttons, setButtons] = useState({
        checkDuplicateIdButton : true,
        sendEmailVerificationButton : true,
        verifyEmailCodeButton: true,
    });

    const areAllValid = Object.values(isVaild).every(value => value === true);

    const handleInputsChange = (event) => {
        const value = event.target.value;
        const mode = event.target.dataset.mode;
        const pwVal = signInputs.userPw;
        handleInputsVal(value, setIsVaild, pwVal, setErrorMessage, setButtons, setSignInputs, mode);
    };
    
    const handleSelChange = (event) => {
        const value = event.target.value;
        setSignInputs((prevState) => {return {...prevState, userEmailDomain : value}});
    };

    const handleBtnClick = (event) => {
        const sInputs = signInputs;
        const mode = event.target.dataset.mode;       
        handleBtnClickEvent(sInputs, setIsVaild, mode, setButtons, setSignInputs, setErrorMessage);

        if(mode === 'email'){
            setTimerStarted(true);
            setTimer(5);
            setTimerExpired(false);
        }
    };

    const handleSubmitClick = (event, mode) => {
        event.preventDefault();
        const userData = {
            userName: signInputs.userName,
            userNickname: signInputs.userNickname,
            userPw: signInputs.userPw,
            userEmail: signInputs.userEmail + signInputs.userEmailDomain,
        }

        if (signup("http://localhost:8080/api/users/signup",userData,mode)) {
            navigate("/loginpage");
        }else{
            alert("다시 시도해 주세요.");
        }
    }

    useEffect(() => {
        let interval;

        if (timerStarted && timer > 0 && !timerExpired) {
            interval = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
          }, 1000);
        } else if (timer <= 0 && !timerExpired) {
          setTimerExpired(true);
          setButtons((prevState) => ({...prevState, sendEmailVerificationButton: false}));
          setTimerStarted(false);
        }   
        return () => clearInterval(interval);
    }, [timerStarted, timer, timerExpired]);

    return (
        <div className={style.loginPage}>
            <form type='post' onSubmit={handleSubmitClick}>
                <CustomLoginPageDiv $logindiv>
                    <CustomLoginPageDiv $haedertext>회원가입</CustomLoginPageDiv>

                    <CustomLoginPageDiv $mbidsection>
                        <CustomLoginPageDiv $mbidlabelinp>
                            <CustomLoginPageLabel $idlabel>아이디 :</CustomLoginPageLabel>
                            <CustomLoginPageInput 
                            $mbspid
                            data-mode='id'
                            placeholder='ID 입력'
                            value={signInputs.userName}
                            onChange={handleInputsChange}/>
                        </CustomLoginPageDiv>
                        <CustomLoginPageBtn 
                            $mbspidcheck
                            type='button'
                            data-mode='id'
                            onClick={handleBtnClick}
                            disabled={buttons.checkDuplicateIdButton}
                        >중복</CustomLoginPageBtn>
                    </CustomLoginPageDiv>
                    {errorMessage.idError}

                    <CustomLoginPageDiv $idpwsection>
                        <CustomLoginPageLabel $idlabel>닉네임 :</CustomLoginPageLabel>
                        <CustomLoginPageInput 
                        $idinput
                        data-mode='nickname'
                        value={signInputs.userNickname} 
                        onChange={handleInputsChange} />
                    </CustomLoginPageDiv>
                    {errorMessage.nicknameError}

                    <CustomLoginPageDiv $idpwsection>
                        <CustomLoginPageLabel $idlabel>비밀번호 입력 :</CustomLoginPageLabel>
                        <CustomLoginPageDiv $pwinputdiv>
                            <CustomLoginPageInput 
                            $pwinput
                            data-mode='pw'
                            placeholder='Password' 
                            type='password' 
                            value={signInputs.userPw} 
                            onChange={handleInputsChange} />
                            <Eyeline className={style.eyelineSvg}/>
                        </CustomLoginPageDiv>
                    </CustomLoginPageDiv>
                    {errorMessage.pwError}

                    <CustomLoginPageDiv $idpwsection>
                        <CustomLoginPageLabel $idlabel>비밀번호 확인 :</CustomLoginPageLabel>
                        <CustomLoginPageDiv $pwinputdiv>
                            <CustomLoginPageInput 
                            $pwinput
                            data-mode='confirmPw'
                            placeholder='Password' 
                            type='password' 
                            value={signInputs.userConfirmPw} 
                            onChange={handleInputsChange} />
                            <Eyeline className={style.eyelineSvg}/>
                        </CustomLoginPageDiv>
                    </CustomLoginPageDiv>
                    {errorMessage.confirmPwError}

                    <CustomLoginPageDiv $mbidsection>
                        <CustomLoginPageDiv $mbidlabelinp>
                            <CustomLoginPageLabel $idlabel>이메일 :</CustomLoginPageLabel>
                            <CustomLoginPageInput 
                            $idinput
                            $signupemail
                            data-mode='email'
                            placeholder='E-mail 입력' 
                            value={signInputs.userEmail} 
                            onChange={handleInputsChange} />
                        </CustomLoginPageDiv>
                        <CustomLoginPageDiv $mbemail>@</CustomLoginPageDiv>
                        <CustomLoginPageSelect $mbemail value={signInputs.userEmailDomain} onChange={handleSelChange}>
                            <option value='@naver.com' className={style.emailOption}>naver.com</option>
                            <option value='@gmail.com' className={style.emailOption}>gmail.com</option>
                            <option value='@kakao.com' className={style.emailOption}>kakao.com</option>
                            <option value='@nate.com' className={style.emailOption}>nate.com</option>
                        </CustomLoginPageSelect>
                        <CustomLoginPageBtn 
                            $mbspidcheck 
                            $emailCertify 
                            data-mode='email'
                            type='button'
                            onClick={handleBtnClick}
                            disabled={buttons.sendEmailVerificationButton}
                        >인증</CustomLoginPageBtn>
                    </CustomLoginPageDiv>
                    {errorMessage.emailError}
                    {timerStarted ? <CustomLoginPageP $errorMessage $timer>재인증 남은 시간: {Math.floor(timer / 60)}:{timer % 60}</CustomLoginPageP> : ''}

                    <CustomLoginPageDiv $mbidsection>
                        <CustomLoginPageDiv $mbidlabelinp>
                            <CustomLoginPageLabel $idlabel>인증번호 :</CustomLoginPageLabel>
                            <CustomLoginPageInput 
                            $mbspid 
                            data-mode='emailCode' 
                            placeholder='인증코드 입력'
                            value={signInputs.userEmailCode} 
                            onChange={handleInputsChange}
                            />
                        </CustomLoginPageDiv>
                        <CustomLoginPageBtn 
                            $mbspidcheck
                            data-mode='emailCode'
                            type='button'
                            disabled={buttons.verifyEmailCodeButton} 
                            onClick={handleBtnClick}
                        >인증확인</CustomLoginPageBtn>
                    </CustomLoginPageDiv>
                    {errorMessage.emailCodeError}

                    <CustomLoginPageBtn
                        type='submit'
                        $loginbtn 
                        $mbspbtn
                        data-mode='signup' 
                        disabled={!areAllValid}
                    >회원가입 완료</CustomLoginPageBtn>
                </CustomLoginPageDiv>
            </form>
        </div>
    )
}

export default SignUpPage;