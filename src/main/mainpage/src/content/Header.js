import React, { useState } from "react";
import style from "./Header.module.css";
import CustomMainPageInput from "../component/CustomMainPageInput";
import CustomMainPageImg from "../component/CustomMainPageImg";
import CustomMainPageP from "../component/CustomMainPageP";
import { useNavigate } from "react-router-dom";

function Header(props) {
    const [val, setVal] = useState("");
    const navigate = useNavigate();

    const onInputChange = (e) => {
        const { value } = e.target;
        setVal(value);
    };

    const onSubmitForm = (e) => {
        e.preventDefault(); // 기본 서브밋 동작 방지
        if (val.length >= 2 && val.length <= 10) {
            navigate(`/search/${val}`);
        }
    };

    return (
        <div className={style.Header}>
            <div className={style.Title}>
                <CustomMainPageP $title>{props.$titleh}</CustomMainPageP>
            </div>
            <form onSubmit={onSubmitForm}>
                <div className={style.Search}>
                    <CustomMainPageInput $headerinput type="text" onChange={onInputChange}
                        value={val} 
                        pattern="[a-zA-Z가-힣0-9]{2,10}" title="2~10글자를 입력해 주세요"
                        placeholder="검색" required></CustomMainPageInput>
                    <button><CustomMainPageImg $headerinputicon src={'/asset/img/SearchIcon.svg'}
                        ></CustomMainPageImg></button>
                </div>
            </form>
        </div>
    )
}

export default Header;