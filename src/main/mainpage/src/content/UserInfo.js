import React from "react";
import style from "./UserInfo.module.css";
import CustomMainPageP from "../component/CustomMainPageP";
import CustomMainPageImg from "../component/CustomMainPageImg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

//Nav아래 유저 설정 박스
function UserInfo(){
    const navigate = useNavigate();
    const nickName = useSelector((state) => state.userData.userNickName);

    const onDivClick = () =>{
        navigate(`/mypage`);
    }
    return(
        <div className={style.UserInfo}>
            <div className={style.NavBotPic}>
                <CustomMainPageImg $navbotpic src={'../asset/img/NavBotPic.svg'}></CustomMainPageImg>
            </div>
            <div className={style.NavFooter}>
                <div className={style.NavFooterInner} onClick={onDivClick}>
                    <div className={style.AvaName}>
                        <CustomMainPageImg $navfooterava src={ '/asset/img/Avatar.svg' }></CustomMainPageImg>
                        <CustomMainPageP $navfootername>{nickName}</CustomMainPageP> {/* 이름 데이터 받아오기 필요 */}
                    </div>
                    <CustomMainPageImg $navfooterset src={ '/asset/img/SettingsIcon.svg' }></CustomMainPageImg>
                </div>
            </div>
        </div>
    )
}

export default UserInfo;