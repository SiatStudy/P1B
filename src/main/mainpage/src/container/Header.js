// 페이지 헤더
import React from "react";
import style from "./Header.module.css";
import CustomMainPageInput from "../component/CustomMainPageInput";
import CustomMainPageImg from "../component/CustomMainPageImg";
import CustomMainPageP from "../component/CustomMainPageP";


function Header(props){

    return(
        <div className={style.Header}>
            <div className={style.Title}>
                <CustomMainPageP $title>{props.$titleh}</CustomMainPageP>
            </div>
            <div className={style.Search}>
                <CustomMainPageInput $headerinput type="text" placeholder="검색"></CustomMainPageInput>
                <CustomMainPageImg $headerinputicon src={ '/asset/img/SearchIcon.svg' }></CustomMainPageImg>
            </div>
        </div>
    )
}

export default Header;