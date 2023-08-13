import React, { useState } from 'react';
import style from "./Page.module.css";
import Header from '../content/Header';
import SideMenu from '../content/SideMenu';
import UserInfo from '../content/UserInfo';
import ProgressBar from '../content/ProgressBar';
import DdayTable from '../content/DdayTable';

function Dday(props) {

  const [titleh, setTitleh] = useState("목표 달성 D-day");

  return (
    <div className={style.Page}>
      <div className={style.Side}>
        <SideMenu titleh={titleh} setTitleh={setTitleh}></SideMenu>
        <UserInfo name="Hyunwoo Kim"></UserInfo>
      </div>
      <div className={style.Main}>
        <Header $titleh={titleh}></Header>
        <div className={style.Section}>
          <ProgressBar month="8월"></ProgressBar>
          <DdayTable month="8월" year="2023"></DdayTable>
        </div>
      </div>
    </div>
  );
}

export default Dday;