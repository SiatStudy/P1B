import style from './LoginPage.module.css';
import CustomLoginPageDiv from "../component/CustomLoginPageDiv";
import CustomLoginPageBtn from '../component/CustomLoginPageBtn';
import CustomLoginPageP from '../component/CustomLoginPageP';
import { useLocation, useNavigate } from 'react-router-dom';
import {NavLink} from 'react-router-dom';

function FindIdResult () {
    const username = useLocation().state.username;
    const navigate = useNavigate();

    return (
        <div className={style.loginPage}>
            <CustomLoginPageDiv $logindiv>
                <CustomLoginPageDiv $findIdPW>
                    <CustomLoginPageBtn $findSelBtn>ID 찾기</CustomLoginPageBtn>
                    <NavLink to="/FindPWPage" className={style.findNoneSel}>
                        <CustomLoginPageBtn $findNoneSelBtn>비밀번호 찾기</CustomLoginPageBtn>
                    </NavLink>
                </CustomLoginPageDiv>

                <CustomLoginPageP $findIdResultP>회원님의 아이디는 {username} 으로 등록되어 있습니다.</CustomLoginPageP>
    
                <CustomLoginPageBtn 
                $loginbtn 
                $mbspbtn
                onClick={() => {navigate("/loginpage")}}
                >로그인 하기</CustomLoginPageBtn>
            </CustomLoginPageDiv>
        </div>
    );
}

export default FindIdResult;