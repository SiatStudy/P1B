import React, { useState, useEffect } from 'react';
import style from './SearchPageContainer.module.css'
import CustomMainPageH1 from '../component/CustomMainPageH1';
import CustomMainPageRow from '../component/CustomMainPageRow';
import { useDispatch, useSelector } from 'react-redux';
import { delTodoData, modifyTodoData } from '../store/todosData';
import axios from 'axios';
import errorFunc from "../util/errorFunc";

const ListDayContainer = () => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const [todoDataArr, setTodoDataArr] = useState([]);
  const ListDaytodosData = useSelector(state => state.todosData.data);
  let currentMonth = new Date().getMonth() + 1;
  let currentYear = new Date().getFullYear();

  useEffect(() => {
    settingReduxData();
  }, []);

  //리덕스 데이터 세팅
  const settingReduxData = () => {
    // 리덕스에서 받기
      let transformedArr = ListDaytodosData.map(item => ({
          tdid: item.tdid,
          today: new Date(item.tdstartDate).getFullYear() + '년 ' + (new Date(item.tdstartDate).getMonth()+1).toString().padStart(2, '0') + '월 ' + new Date(item.tdstartDate).getDate() + '일',
          month: new Date(item.tdstartDate).getMonth() + 1,
          startDay: new Date(item.tdstartDate).getDate(),
          startTime: new Date(item.tdstartDate).getHours().toString().padStart(2, '0') + ':' + new Date(item.tdstartDate).getMinutes().toString().padStart(2, '0'),
          endDay: new Date(item.tdendDate).getDate(),
          endTime: new Date(item.tdendDate).getHours().toString().padStart(2, '0') + ':' + new Date(item.tdendDate).getMinutes().toString().padStart(2, '0'),
          tdtitle: item.tdtitle,
          status: item.status
      }));

      const filterData = transformedArr.filter(item => item.month === currentMonth );
      getFilteredData(filterData);
  }

  // 월별 작업 데이터 정렬 및 필터링하는 함수
  const getFilteredData = (arr) => {

    // 데이터 정렬 (낮은 순 정렬 -> startDay기준->startTime기준->endDay기준->endTime기준)
    const sortedData = arr.sort((a, b) => {
      if (a.startDay !== b.startDay) {
        return a.startDay - b.startDay;
      } else if (a.startTime !== b.startTime) {
        return a.startTime - b.startTime;
      } else if (a.endDay !== b.endDay) {
        return a.endDay - b.endDay;
      } else {
        return a.endTime - b.endTime;
      }
    });

    // 정렬된 데이터를 일별로 그룹화
    const groupedData = {};
    sortedData.forEach((data) => {
      const { startDay } = data;
      if (!groupedData[startDay]) {
        groupedData[startDay] = [];
      }
      groupedData[startDay].push(data);
    });

    setTodoDataArr(groupedData);
  };

  const toggleStatus = async (tdid, status) => {
    try {
      const res = await axios.post("http://localhost:8080/api/todos/change", {tdid : tdid});
      console.log("토글스테이터스");
      console.log(res);
      console.dir(res);
      if(res.data.isValid){
        dispatch(modifyTodoData({ tdid: tdid, key: "status", value: !status }));
      }else{
        console.log("수정 실패");
      }
    } catch (err) {
      // 에러 핸들링을 위해 errorFunc 유틸리티 사용
      errorFunc('dupleAxios', err);
    }
    // 여기에 status수정 백엔드 통신 필요
  }
  const delRow = async (tdid) => {
    // 여기에 DB에서 해당 tdid 지우는 백엔드 통신 필요
    try {
      const res = await axios.post("http://localhost:8080/api/todos/elimination", {tdid : tdid});
      console.log("삭제");
      console.log(res);
      if(res.data.isValid){
        dispatch(delTodoData(tdid));
      }else{
        console.log("삭제 실패");
      }
    } catch (err) {
      // 에러 핸들링을 위해 errorFunc 유틸리티 사용
      errorFunc('dupleAxios', err);
    }
  };

  const changeRow = tdid =>{
    // 비어있는 함수
  }

  return (
    <div className={style.mainContainer}>
      <div className={style.titleDiv}>
        <div className={style.monthTitle}>{currentMonth}월</div>
        <CustomMainPageH1 $searchPageYear>{currentYear}</CustomMainPageH1>
      </div>
      {/* // 각 일별 컨테이너 생성 (일의 이름을 key로 설정 */}
      {Object.entries(todoDataArr).map(([startDay, works]) => (
        <div className={style.dayContainer} key={startDay}>
           {/* 해당 일의 today속성 */}
           <div className={style.dayTitle}>{works.length > 0 ? works[0].today : ''}</div>
           <div className={style.worksContainer}>
          {works.map(work => (
            // CustomMainPageRow 컴포넌트를 작업 데이터에 맞게 생성
            <CustomMainPageRow
              key={work.tdid}
              $page="searchPage"
              // 작업 기간이 하루인 경우에는 단일 날짜를 표시하고, 아닌 경우에는 작업 기간을 표시하는 title 설정
              title={work.startDay === work.endDay ? `${work.startTime + " - " + work.endTime}` : `${work.startTime} ~ `}
              // 작업 제목을 표시
              value={work.tdtitle}
              status={work.status}
              $isButtonVisible={true}
              toggleStatus={()=>{toggleStatus(work.tdid, work.status)}}
              delRow={()=>{delRow(work.tdid)}}
              changeRow={()=>{changeRow(work.tdid)}}
            />
          ))} </div>
        </div>
      ))}

    </div>
  );
};

export default ListDayContainer;