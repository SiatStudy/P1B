import React, { useState } from 'react';
import style from "./MainPage.module.css";
import Header from '../content/Header';
import SideMenu from '../content/SideMenu';
import UserInfo from '../content/UserInfo';
import Graph from '../content/Graph';

function GraphP() {

  const [titleh, setTitleh] = useState("그래프로 한 눈에 보기");

  return (
    <div className={style.Page}>
      <div className={style.Side}>
        <SideMenu titleh={titleh} setTitleh={setTitleh} />
        <UserInfo />
      </div>
      <div className={style.MainA}>
        <Header $titleh={titleh} />
        <div className={style.GraphM}>
            <Graph />
        </div>
      </div>
    </div>
  );
}

export default GraphP;