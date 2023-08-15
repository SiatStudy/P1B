import React, { useState } from 'react';
import style from "./MainPage.module.css";
import Header from '../content/Header';
import SideMenu from '../content/SideMenu';
import UserInfo from '../content/UserInfo';
import ProgressBar from '../content/ProgressBar';
import DdayTable from '../content/DdayTable';

function Dday(props) {

  const [titleh, setTitleh] = useState("목표 달성 D-day");
  const date = new Date();
  const month = date.getMonth()+1+"월";
  const year = date.getFullYear();

  return (
    <div className={style.Page}>
      <div className={style.Side}>
        <SideMenu titleh={titleh} setTitleh={setTitleh}></SideMenu>
        <UserInfo></UserInfo>
      </div>
      <div className={style.Main}>
        <Header $titleh={titleh}></Header>
        <div className={style.Section}>
          <ProgressBar month={month}></ProgressBar>
          <DdayTable month={month} year={year}></DdayTable>
        </div>
      </div>
    </div>
  );
}

export default Dday;