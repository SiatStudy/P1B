import style from '../page/LoginPage.module.css';
import CustomLoginPageDiv from "../component/CustomLoginPageDiv";
import CustomLoginPageInput from '../component/CustomLoginPageInput';
import CustomLoginPageLabel from '../component/CustomLoginPageLabel';
import CustomLoginPageBtn from '../component/CustomLoginPageBtn';
import CustomLoginPageP from '../component/CustomLoginPageP';
import {NavLink} from 'react-router-dom';
import {useState} from 'react';
import axios from "axios";
import errorFunc from '../util/errorFunc';
import {useNavigate} from 'react-router-dom';

const FindIdPage = () => {
    const [userEmail, setUserEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [disabled, setDisabled] = useState(true);
    const navigate = useNavigate();

    const handleInputsChange = (event) => {
        const value = event.target.value;
        const emailRegex = /^[A-Za-z0-9.@]{1,63}$/;
        setUserEmail(value);
        if (value.trim() === "" || !emailRegex.test(value)) {
            setDisabled(true);
            return setEmailError(<CustomLoginPageP $errorMessage $findidp>이메일: 63자이하의 영문 대/소문자, 숫자를 사용해 주세요.</CustomLoginPageP>);
        }else{
            setEmailError('');
            setDisabled(false);
        }
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(res.data.username);
        console.log(username);

        axios.post("http://localhost:8080/api/login/search/id", null,  {params:{userEmail : userEmail}})
        .then(res => {
            if(res.data.isValid){
                navigate("/findidresult", {state : { username : res.data.username}});
                console.log(res.data.username);
                console.log(username);
            }else{
                setDisabled(true);
                setEmailError(<CustomLoginPageP $errorMessage $findidp>이메일을 다시 입력해주세요.</CustomLoginPageP>);
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
                    <CustomLoginPageDiv $findIdPW>
                        <CustomLoginPageBtn $findSelBtn type='button'>ID 찾기</CustomLoginPageBtn>
                        <NavLink to="/FindPWPage" className={style.findNoneSel}>
                            <CustomLoginPageBtn $findNoneSelBtn type='button'>비밀번호 찾기</CustomLoginPageBtn>
                        </NavLink>
                    </CustomLoginPageDiv>

                    <CustomLoginPageDiv $idpwsection $findidsection>
                        <CustomLoginPageLabel $idlabel>E-mail :</CustomLoginPageLabel>
                        <CustomLoginPageInput 
                            $idinput 
                            placeholder='E-mail 입력' 
                            value={userEmail} 
                            onChange={handleInputsChange}
                        />
                    </CustomLoginPageDiv>
                    {emailError}

                    <CustomLoginPageBtn $loginbtn $mbspbtn type='submit' disabled={disabled}>ID 찾기</CustomLoginPageBtn>
                </CustomLoginPageDiv>
            </form>
        </div>
    );
}

export default FindIdPage;