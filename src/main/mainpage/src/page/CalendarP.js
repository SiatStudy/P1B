import React, { useState } from 'react';
import style from "./CalendarP.module.css";
import Header from '../container/Header';
import SideMenu from '../container/SideMenu';
import UserInfo from '../container/UserInfo';
import { Calendar } from '../content/Calendar';

function CalendarP() {

  const [titleh, setTitleh] = useState("Calendar");

  return (
    <div className={style.CalendarP}>
      <div className={style.Side}>
        <SideMenu titleh={titleh} setTitleh={setTitleh} />
        <UserInfo />
      </div>
      <div className={style.Main}>
        <Header $titleh={titleh} />
        <div className={style.CalendarM}>
          <Calendar mode={"calendar"} />
        </div>
      </div>
    </div>
  );
}

export default CalendarP;