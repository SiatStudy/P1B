import style from '../page/LoginPage.module.css';
import CustomLoginPageDiv from "../component/CustomLoginPageDiv";
import CustomLoginPageInput from '../component/CustomLoginPageInput';
import CustomLoginPageLabel from '../component/CustomLoginPageLabel';
import CustomLoginPageBtn from '../component/CustomLoginPageBtn';
import CustomLoginPageP from '../component/CustomLoginPageP';
import {useNavigate, NavLink} from 'react-router-dom';
import {useState} from 'react';
import axios from "axios";
import errorFunc from '../util/errorFunc';

const FindPWPage = () => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isVaild, setIsVaild] = useState({
        checkId : false,
        checkEmail : false
    });
    const areAllValid = Object.values(isVaild).every(value => value === true);
    const navigate = useNavigate();

    const handleIdChange = (event) => {
        const value = event.target.value;
        const idRegex = /^[A-Za-z0-9]{3,8}$/;
        setUserName(value);
        if (value.trim() === "" || !idRegex.test(value)) {
            setIsVaild((prevState) => ({...prevState, checkId : false}));
            return setErrorMessage(<CustomLoginPageP $errorMessage $findpwp>아이디 또는 이메일을 다시 입력해주세요.</CustomLoginPageP>);
        }else{
            setErrorMessage('');
            setIsVaild((prevState) => ({...prevState, checkId : true}));
        }
    }
    const handleEmailChange = (event) => {
        const value = event.target.value;
        const emailRegex = /^[A-Za-z0-9.@]{1,63}$/;
        setUserEmail(value);
        if (value.trim() === "" || !emailRegex.test(value)) {
            setIsVaild((prevState) => ({...prevState, checkEmail : false}));
            return setErrorMessage(<CustomLoginPageP $errorMessage $findpwp>아이디 또는 이메일을 다시 입력해주세요.</CustomLoginPageP>);
        }else{
            setErrorMessage('');
            setIsVaild((prevState) => ({...prevState, checkEmail : true}));
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            userName: userName,
            userEmail: userEmail,
        }

        axios.post("http://localhost:8080/login/search/password", null,  {params:{userData : userData}})
        .then(res => {
            if(res.status === 200){
                navigate("/findpwresult");
            }else{
                setIsVaild((prevState) => ({...prevState, checkId : false}));
                setIsVaild((prevState) => ({...prevState, checkEmail : false}));
                setErrorMessage(<CustomLoginPageP $errorMessage $findpwp>아이디 또는 이메일을 다시 입력해주세요.</CustomLoginPageP>);
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
                            <NavLink to="/FindIdPage" className={style.findNoneSel}>
                                <CustomLoginPageBtn $findNoneSelBtn type='button'>ID 찾기</CustomLoginPageBtn>
                            </NavLink>
                            <CustomLoginPageBtn $findSelBtn type='button'>비밀번호 찾기</CustomLoginPageBtn>
                        </CustomLoginPageDiv>

                        <CustomLoginPageDiv $idpwsection $findpwsection>
                            <CustomLoginPageLabel $idlabel>ID :</CustomLoginPageLabel>
                            <CustomLoginPageInput $idinput value={userName} onChange={handleIdChange} placeholder='ID 입력' />
                        </CustomLoginPageDiv>

                        <CustomLoginPageDiv $idpwsection $findpwsection>
                            <CustomLoginPageLabel $idlabel>E-mail :</CustomLoginPageLabel>
                            <CustomLoginPageInput $idinput value={userEmail} onChange={handleEmailChange} placeholder='E-mail 입력' />
                        </CustomLoginPageDiv>
                        {errorMessage}

                        <CustomLoginPageBtn $loginbtn $mbspbtn type='submit' disabled={!areAllValid}>비밀번호 찾기</CustomLoginPageBtn>
                    </CustomLoginPageDiv>
                </CustomLoginPageDiv>
            </form>
        </div>
    );
}

export default FindPWPage;