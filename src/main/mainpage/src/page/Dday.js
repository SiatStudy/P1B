import React, { useState } from 'react';
import style from "./Dday.module.css";
import Header from '../container/Header';
import SideMenu from '../container/SideMenu';
import UserInfo from '../container/UserInfo';
import ProgressBar from '../container/ProgressBar';
import DdayTable from '../container/DdayTable';

function Dday(props) {

  const [titleh, setTitleh] = useState("목표 달성 D-day");

  return (
    <div className={style.Dday}>
      <div className={style.Side}>
        <SideMenu titleh={titleh} setTitleh={setTitleh}></SideMenu>
        <UserInfo name="Hyunwoo Kim"></UserInfo>
      </div>
      <div className={style.Main}>
        <Header $titleh={titleh}></Header>
        <div className={style.Section}>
          <ProgressBar month="6월"></ProgressBar>
          <DdayTable month="6월" year="2023"></DdayTable>
        </div>
      </div>
    </div>
  );
}

export default Dday;