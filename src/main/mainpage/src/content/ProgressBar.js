// 목표달성 페이지 프로그레스 바

import React, { useEffect, useState } from "react";
import style from "./ProgressBar.module.css";
import CustomMainPageProgress from "../component/CustomMainPageProgress";
import CustomMainPageDiv from "../component/CustomMainPageDiv";
import CustomMainPageLabel from "../component/CustomMainPageLabel";
import CustomMainPageP from "../component/CustomMainPageP";
// import dataAverage from "../util/dataUtils/dataAverage"; //프로그래스바 밸류값 전달 함수 "value={avg1}"


function ProgressBar(props){

    // const [avg1, setAvg1] = useState(0);

    // useEffect(()=>{
    //     setAvg1(dataAverage());
    // },[])

    return(
        <div className={style.Progress}>
            <div className={style.MonthTitle}>
                {/* 월 받아오기 필요 */}
                <CustomMainPageDiv $month>{props.month}</CustomMainPageDiv>
                <CustomMainPageP $title>달성도</CustomMainPageP>    
            </div>
            <div className={style.ProgressOuter}>
                <div className={style.ProgressL}>
                    <CustomMainPageLabel $progressl>당월 달성도</CustomMainPageLabel>
                    <CustomMainPageLabel $progressl>기준 (%)</CustomMainPageLabel>
                </div>
                <div className={style.ProgressBar}>
                    <CustomMainPageProgress $progressbar min="0" max="100" value={props.progress}></CustomMainPageProgress>
                    <div className={style.ProgressUnder}>
                    <CustomMainPageLabel $progressunder>20%</CustomMainPageLabel>
                    <CustomMainPageLabel $progressunder>40%</CustomMainPageLabel>
                    <CustomMainPageLabel $progressunder>60%</CustomMainPageLabel>
                    <CustomMainPageLabel $progressunder>80%</CustomMainPageLabel>
                    </div>
                </div>
                <CustomMainPageLabel $progressr>100%</CustomMainPageLabel>
            </div>
        </div>
    )
}

ProgressBar.defaultProps = {
    progress: '0'
}

export default ProgressBar;