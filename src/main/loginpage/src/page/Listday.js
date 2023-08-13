import React, { useState, useEffect } from "react";
import style from "./Page.module.css";
import Header from '../content/Header';
import SideMenu from '../content/SideMenu';
import UserInfo from '../content/UserInfo';
import { Calendar } from "../content/Calendar";
import { getUserData } from "../apis/apis";
import { useDispatch, useSelector } from "react-redux";
import { setUserEmail, setUserNickName } from "../store/userData";
import { addTodoData, delTodoData, modifyTodoData, setTodoData } from "../store/todoData";
import dummyData3 from "../apis/dummyData3";

function Listday() {
  const [titleh, setTitleh] = useState("List Day");
  // //리덕스 연결
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  const todoData = useSelector((state) => state.todoData);

  useEffect(() => {
    testingRedux();
  }, []);


  const testingRedux = () => {
    // 리덕스 나오는지 확인 코드
    dispatch(setUserNickName("사용자1"));
    let nickName = userData.userNickName;
    console.log("nickName리덕스: "+nickName)
    dispatch(setUserEmail("example1234@gmail.com"));
    console.log("email리덕스: " + userData.userEmail);

    // todoData리덕스
    dispatch(setTodoData(dummyData3()));
    console.log("todoList리덕스: ");
    console.log(todoData);
    let obj1 = {
        tdid: "td4",
        month: 4,
        startDate: 4,
        endDate: 4,
        finishDate: 4,
        workTitle: "title4",
        workContent: "content4"
    }
    dispatch(addTodoData(obj1));
    console.log("리덕스 배열 값 추가")
    console.log(todoData);
    dispatch(delTodoData("td1"));
    console.log("리덕스 배열 값 삭제")
    console.log(todoData);
    dispatch(modifyTodoData({tdid:"td2",key:"workContent",value:"new1"}));
    console.log("리덕스 배열 값 수정")
    console.log(todoData);
  }

//처음 페이지 랜딩 시 백엔드에 요청해서 리덕스에 닉네임, 이메일 저장
  // const setBackData = () => {
  //   let obj = getUserData(`/api/users/setting`);
  //   dispatch(setUserEmail(obj.email));
  //   dispatch(setUserNickName(obj.nickName));
  // };

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
          {/* 아래 div 두개는 테스트용 코드이므로 실 사용시 삭제해야됨 */}
          <div><h2>userData</h2>
          <pre>{JSON.stringify(userData, null, 2)}</pre></div>
          <div><h2>todoData</h2>
          <pre>{JSON.stringify(todoData, null, 2)}</pre></div>
        </div>
      </div>
    </div>
  );
}

export default Listday;
