import React, { useState } from 'react';
import style from "./GraphP.module.css";
import Header from '../container/Header';
import SideMenu from '../container/SideMenu';
import UserInfo from '../container/UserInfo';
import Graph from '../content/Graph';

function GraphP() {

  const [titleh, setTitleh] = useState("그래프로 한 눈에 보기");

  return (
    <div className={style.GraphP}>
      <div className={style.Side}>
        <SideMenu titleh={titleh} setTitleh={setTitleh} />
        <UserInfo />
      </div>
      <div className={style.Main}>
        <Header $titleh={titleh} />
        <div className={style.GraphM}>
            <Graph />
        </div>
      </div>
    </div>
  );
}

export default GraphP;