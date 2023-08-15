import React, { useState } from 'react';
import style from "./MainPage.module.css";
import Header from '../content/Header';
import SideMenu from '../content/SideMenu';
import UserInfo from '../content/UserInfo';
import MyPageContainer from '../content/MyPageContainer';

function MyPage() {
  const [titleh, setTitleh] = useState("마이페이지");

  return (
    <div className={style.Page}>
      <div className={style.Side}>
      <SideMenu titleh={titleh} setTitleh={setTitleh}></SideMenu>
        <UserInfo></UserInfo>
      </div>
      <div className={style.Main}>
      <Header $titleh={titleh} />
      <div className={style.MyPage}>
        <MyPageContainer></MyPageContainer>
      </div>
      </div>
    </div>
  );
}

export default MyPage;