import React, { useState, useEffect } from "react";
import style from "./MainPage.module.css";
import Header from '../content/Header';
import SideMenu from '../content/SideMenu';
import UserInfo from '../content/UserInfo';
import { connectTodoData, getUserData } from "../apis/apis";
import { useDispatch, useSelector } from "react-redux";
import { setUserEmail, setUserNickName } from "../store/userData";
import ListDayContainer from "../content/ListDayContainer";
import { setTodoData } from "../store/todosData";

function Listday() {
  const [titleh, setTitleh] = useState("List Day");
  // //리덕스 연결
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  const todosData = useSelector((state) => state.todosData);

  useEffect(() => {
    connectBack();
  }, []);

  // 백엔드에서 데이터 받아오기
  const connectBack = async () => {
    const date = new Date();
    const year = date.getFullYear()
    let obj = await getUserData(`/api/users/setting`);
    console.log(obj);
    console.dir(obj);
    dispatch(setUserEmail(obj.email));
    dispatch(setUserNickName(obj.nickName));

    let arr = await connectTodoData(`/api/todos/list`, "get");
    // 받아온 배열을 알맞은 형태로 교체
    const transformeArr = arr.map(item => {
      return {
        tdid: item.tdid,
        tdstartDate: item.tdstartdate,
        tdendDate: item.tdenddate,
        tdtitle: item.tdtitle,
        tdcontent: item.tdcontent,
        status: item.status,
      };
    })
    dispatch(setTodoData(transformeArr));
  }
  
  
  return (
    <div className={style.Page}>
      <div className={style.Side}>
        <SideMenu titleh={titleh} setTitleh={setTitleh}></SideMenu>
        <UserInfo />
      </div>
      <div className={style.MainA}>
        <Header $titleh={titleh} />
          <ListDayContainer></ListDayContainer>
        </div>
    </div>
  );
}

export default Listday;