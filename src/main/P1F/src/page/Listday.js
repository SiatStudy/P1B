import React, { useState, useEffect } from "react";
import style from "./Page.module.css";
import Header from '../content/Header';
import SideMenu from '../content/SideMenu';
import UserInfo from '../content/UserInfo';
import { Calendar } from "../content/Calendar";
import { getUserData } from "../apis/apis";
import { useDispatch, useSelector } from "react-redux";
import { setUserEmail, setUserNickName } from "../store/userData";
import { setTodoData } from "../store/todoData";

function Listday() {
  // //리덕스 연결
  // const dispatch = useDispatch();
  // const userData = useSelector((state) => state.userData);
  // const todoData = useSelector((state) => state.todoData);
  const [titleh, setTitleh] = useState("List Day");

  // //처음 페이지 랜딩 시 백엔드에 요청해서 리덕스에 닉네임, 이메일 저장
  // useEffect(() => {
  //   let obj = getUserData(`/api/users/setting`);
  //   dispatch(setUserEmail(obj.email));
  //   dispatch(setUserNickName(obj.nickName));
  // }, []);

  // //닉네임 사용할때 이렇게 변수에 저장해 사용
  // let nickName = userData.userNickName;

  return (
    <div className={style.Page}>
      <div className={style.Side}>
        <SideMenu titleh={titleh} setTitleh={setTitleh}></SideMenu>
        <UserInfo />
      </div>
      <div className={style.Main}>
        <Header $titleh={titleh} />
        <div className={style.List}>
          <Calendar mode={"list"} />
        </div>
      </div>
    </div>
  );
}

export default Listday;
