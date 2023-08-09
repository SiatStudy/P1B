import style from './LoginPage.module.css';
import CustomLoginPageDiv from "../component/CustomLoginPageDiv";
import CustomLoginPageBtn from '../component/CustomLoginPageBtn';
import CustomLoginPageLabel from '../component/CustomLoginPageLabel';
import CustomLoginPageInput from '../component/CustomLoginPageInput';
import { ReactComponent as Eyeline } from "../svg/Eyeline.svg";
import CustomLoginPageP from '../component/CustomLoginPageP';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import axios from "axios";
import errorFunc from '../util/errorFunc';

function FindPWResult () {
    const [userPw, setUserPw] = useState('');
    const [userConfirmPw, setUserConfirmPw] = useState('');
    const [pwError, setPwError] = useState('');
    const [confirmPwError, setConfirmPwError] = useState('');
    const [isVaild, setIsVaild] = useState({
        checkPw : false,
        checkConfirmPw : false
    });

    const areAllValid = Object.values(isVaild).every(value => value === true);
    const navigate = useNavigate();

    const handlePWChange = (event) => {
        const value = event.target.value;
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
        setUserPw(value);

        if (value.trim() === "" || !passwordRegex.test(value)) {
            setIsVaild((prevState) => ({...prevState, checkPw : false}));
            return setPwError(<CustomLoginPageP $errorMessage $findpwp>비밀번호: 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.</CustomLoginPageP>);
        }else{
            setPwError('');
            setIsVaild((prevState) => ({...prevState, checkPw : true}));
        }
    }
    const handleConfirmPWChange = (event) => {
        const value = event.target.value;
        setUserConfirmPw(value);

        if (value.trim() === "" || userPw !== value) {
            setIsVaild((prevState) => ({...prevState, checkConfirmPw : false}));
            return setConfirmPwError(<CustomLoginPageP $errorMessage $findpwp>비밀번호랑 동일하게 입력해주세요.</CustomLoginPageP>);
        }else{
            setConfirmPwError('');
            setIsVaild((prevState) => ({...prevState, checkConfirmPw : true}));
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            userPw: userPw,
            userConfirmPw: userConfirmPw,
        }

        axios.post("http://localhost:8080/find/userpwupdate", null,  {params:{userData : userData}})
        .then(res => {
            if(res.status === 200){
                navigate("/loginpage");
            }else{
                setIsVaild((prevState) => ({...prevState, checkPw : false}));
                setIsVaild((prevState) => ({...prevState, checkConfirmPw : false}));
                setConfirmPwError(<CustomLoginPageP $errorMessage $findpwp>비밀번호를 다시 입력해 주세요.</CustomLoginPageP>);
            }
        })
        .catch(err => {
            // 에러 핸들링을 위해 errorFunc 유틸리티 사용
            errorFunc('dupleAxios', err)
        })

    }

    return (
        <div className={style.loginPage}>
            <form onSubmit={handleSubmit}>
                <CustomLoginPageDiv $logindiv>
                    <CustomLoginPageDiv $logindiv>
                        <CustomLoginPageDiv $findIdPW>
                            <CustomLoginPageBtn $findSelBtn $resultpw type='button'>비밀번호 찾기</CustomLoginPageBtn>
                        </CustomLoginPageDiv>

                        <CustomLoginPageDiv $idpwsection $findpwsection>
                            <CustomLoginPageLabel $idlabel>비밀번호 :</CustomLoginPageLabel>
                            <CustomLoginPageDiv $pwinputdiv>
                                <CustomLoginPageInput 
                                $pwinput 
                                type='password' 
                                value={userPw} 
                                onChange={handlePWChange}/>
                                <Eyeline className={style.eyelineSvg}/>
                            </CustomLoginPageDiv>
                        </CustomLoginPageDiv>
                        {pwError}

                        <CustomLoginPageDiv $idpwsection $findpwsection>
                            <CustomLoginPageLabel $idlabel>비밀번호 확인 :</CustomLoginPageLabel>
                            <CustomLoginPageDiv $pwinputdiv>
                                <CustomLoginPageInput 
                                $pwinput 
                                type='password' 
                                value={userConfirmPw} 
                                onChange={handleConfirmPWChange}/>
                                <Eyeline className={style.eyelineSvg}/>
                            </CustomLoginPageDiv>
                        </CustomLoginPageDiv>
                        {confirmPwError}

                        <CustomLoginPageBtn $loginbtn $mbspbtn type='submit' disabled={!areAllValid}>비밀번호 변경</CustomLoginPageBtn>
                    </CustomLoginPageDiv>
                </CustomLoginPageDiv>
            </form>
        </div>
    );
}

export default FindPWResult;