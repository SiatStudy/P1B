import style from './LoginPage.module.css';
import CustomLoginPageDiv from "../component/CustomLoginPageDiv";
import CustomLoginPageInput from '../component/CustomLoginPageInput';
import CustomLoginPageLabel from '../component/CustomLoginPageLabel';
import CustomLoginPageBtn from '../component/CustomLoginPageBtn';
import CustomLoginPageP from '../component/CustomLoginPageP';
import { ReactComponent as Eyeline } from "../svg/Eyeline.svg";
import { useState } from 'react';
import axios from "axios";
import errorFunc from '../util/errorFunc';
import {useNavigate, Link} from 'react-router-dom';

function LoginPage () {

    const [userName, setUserName] = useState('');
    const [userPw, setUserPw] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isVaild, setIsVaild] = useState({
        checkId : false,
        checkPw : false
    });
    const areAllValid = Object.values(isVaild).every(value => value === true);
    const navigate = useNavigate();

    const handleIdChange = (event) => {
        const value = event.target.value;
        const idRegex = /^[A-Za-z0-9]{3,8}$/;
        setUserName(value);
        if (value.trim() === "" || !idRegex.test(value)) {
            setIsVaild((prevState) => ({...prevState, checkId : false}));
            return setErrorMessage(<CustomLoginPageP $errorMessage $loginerr>아이디 또는 비밀번호를 다시 입력해주세요.</CustomLoginPageP>);
        }else{
            setErrorMessage('');
            setIsVaild((prevState) => ({...prevState, checkId : true}));
        }
    }
    const handlePwChange = (event) => {
        const value = event.target.value;
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
        setUserPw(value);
        if (value.trim() === "" || !passwordRegex.test(value)) {
            setIsVaild((prevState) => ({...prevState, checkPw : false}));
            return setErrorMessage(<CustomLoginPageP $errorMessage $loginerr>아이디 또는 비밀번호를 다시 입력해주세요.</CustomLoginPageP>);
        }else{
            setErrorMessage('');
            setIsVaild((prevState) => ({...prevState, checkPw : true}));
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            userName: userName,
            userEmail: userPw,
        }

        axios.post("http://localhost:8080/login/login", null,  {params:{userData : userData}})
        .then(res => {
            if(res.status === 200){
                navigate("/login/login");
                console.log("로그인 성공");
            }else{
                setIsVaild((prevState) => ({...prevState, checkId : false}));
                setIsVaild((prevState) => ({...prevState, checkPw : false}));
                setErrorMessage(<CustomLoginPageP $errorMessage $loginerr>아이디 또는 비밀번호를 다시 입력해주세요.</CustomLoginPageP>);
            }
        })
        .catch(err => {
            // 에러 핸들링을 위해 errorFunc 유틸리티 사용
            errorFunc('dupleAxios', err)
        })

    }

    return(
        <div className={style.loginPage}>
            <form onSubmit={handleSubmit}>
                <CustomLoginPageDiv $logindiv>
                    <CustomLoginPageDiv $haedertext>로그인</CustomLoginPageDiv>

                    <CustomLoginPageDiv $idpwsection>
                        <CustomLoginPageLabel $idlabel>ID :</CustomLoginPageLabel>
                        <CustomLoginPageInput $idinput value={userName} onChange={handleIdChange} placeholder='ID 입력' />
                    </CustomLoginPageDiv>

                    <CustomLoginPageDiv $idpwsection>
                        <CustomLoginPageLabel $idlabel>Password :</CustomLoginPageLabel>
                        <CustomLoginPageDiv $pwinputdiv>
                            <CustomLoginPageInput $pwinput type='password' value={userPw} onChange={handlePwChange} placeholder='Password' />
                            <Eyeline className={style.eyelineSvg}/>
                        </CustomLoginPageDiv>
                    </CustomLoginPageDiv>
                    {errorMessage}

                    <CustomLoginPageDiv $find>
                    <Link to="/findidpage"><CustomLoginPageBtn $findIdPWbtn type='button'>ID 찾기</CustomLoginPageBtn></Link>
                        /
                    <Link to="/findpwpage"><CustomLoginPageBtn $findIdPWbtn type='button'>비밀번호 찾기</CustomLoginPageBtn></Link>
                    </CustomLoginPageDiv>

                    <CustomLoginPageBtn $loginbtn type='submit' disabled={!areAllValid}>로그인</CustomLoginPageBtn>

                    <CustomLoginPageDiv $membershipsection>
                        아직 회원이 아니십니까?
                        <Link to="/signuppage"><CustomLoginPageBtn $membershipbtn type='button'>회원가입</CustomLoginPageBtn></Link>
                    </CustomLoginPageDiv>
                </CustomLoginPageDiv>
            </form>
        </div>
    )
}

export default LoginPage;