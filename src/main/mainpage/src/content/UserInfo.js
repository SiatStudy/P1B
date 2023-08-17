import React from "react";
import style from "./UserInfo.module.css";
import CustomMainPageP from "../component/CustomMainPageP";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReactComponent as NavBotPic } from "../asset/img/NavBotPic.svg";
import { ReactComponent as Avatar } from "../asset/img/Avatar.svg";
import { ReactComponent as SettingsIcon } from "../asset/img/SettingsIcon.svg";

//Nav아래 유저 설정 박스
function UserInfo(){
    const navigate = useNavigate();
    const nickName = useSelector((state) => state.userData.userNickName);

    const onDivClick = () =>{
        navigate("/mypage");
    }
    return(
        <div className={style.UserInfo}>
            <div className={style.OuterNavBotPic}>
                <NavBotPic className={style.NavBotPic}></NavBotPic>
            </div>
            <div className={style.NavFooter}>
                <div className={style.NavFooterInner} onClick={onDivClick}>
                    <div className={style.AvaName}>
                        <Avatar className={style.Avatar}></Avatar>
                        <CustomMainPageP $navfootername>{nickName}</CustomMainPageP> {/* 이름 데이터 받아오기 필요 */}
                    </div>
                    <SettingsIcon className={style.SettingsIcon}></SettingsIcon>
                </div>
            </div>
        </div>
    )
}

export default UserInfo;