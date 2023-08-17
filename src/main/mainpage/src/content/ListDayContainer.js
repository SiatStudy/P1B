import React, { useState, useEffect } from 'react';
import style from './SearchPageContainer.module.css'
import CustomMainPageH1 from '../component/CustomMainPageH1';
import CustomMainPageRow from '../component/CustomManinPageRow';
import { useDispatch, useSelector } from 'react-redux';
import { delTodoData, modifyTodoData } from '../store/todosData';

const ListdayContainer = () => {
  const dispatch = useDispatch();
  const [todoDataArr, setTodoDataArr] = useState([]);
  const todosData = useSelector((state) => state.todosData);
  const date = new Date();
  let currentMonth = date.getMonth() + 1;
  let currentYear = date.getFullYear();

  useEffect(() => {
    settingReduxData();
  }, [todosData]);

  //리덕스 데이터 세팅
  const settingReduxData = () => {
    // 리덕스에서 받기
    if (todosData.data.length != 0){
      let transformeArr = todosData.data.map(item => {
        const { tdStartDate, tdEndDate } = item;
        const startDateObj = new Date(tdStartDate);
        const endDateObj = new Date(tdEndDate);
        const options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        };
        return {
          tdid: item.tdid,
          today: startDateObj.toLocaleDateString('ko-KR', options),
          month: startDateObj.getMonth() + 1,
          startDay: startDateObj.getDate(),
          startTime: startDateObj.toLocaleTimeString('en-US', { hour12: false }).split(':').slice(0, 2).join(':'),
          endDay: endDateObj.getDate(),
          endTime: endDateObj.toLocaleTimeString('en-US', { hour12: false }).split(':').slice(0, 2).join(':'),
          tdTitle: item.tdTitle,
          status: item.status
        };
      });
      transformeArr = transformeArr.filter(item => { return item.month == currentMonth });
      setTodoDataArr(transformeArr);
    }
  }

  // 월별 작업 데이터 정렬 및 필터링하는 함수
  const getFilteredData = () => {

    // 데이터 정렬 (낮은 순 정렬 -> startDay기준->startTime기준->endDay기준->endTime기준)
    const sortedData = todoDataArr.sort((a, b) => {
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

    return groupedData;
  };

  const toggleStatus = (tdid, status) => {
    dispatch(modifyTodoData({ tdid: tdid, key: "status", value: !status }));
    // 여기에 status수정 백엔드 통신 필요
  }
  const delRow = tdid =>{
    dispatch(delTodoData(tdid));
    // 여기에 DB에서 해당 tdid 지우는 백엔드 통신 필요
  }

  const filteredData = getFilteredData();

  return (
    <div className={style.mainContainer}>
      <div className={style.titleDiv}>
        <div className={style.monthTitle}>{currentMonth}월</div>
        <CustomMainPageH1 $searchPageYear>{currentYear}</CustomMainPageH1>
      </div>
      {/* // 각 일별 컨테이너 생성 (일의 이름을 key로 설정 */}
      {Object.entries(filteredData).map(([startDay, works]) => (
        <div className={style.dayContainer} key={startDay}>
           {/* 해당 일의 today속성 */}
           <div className={style.dayTitle}>{works.length > 0 ? works[0].today : ''}</div>
           <div className={style.worksContainer}>
          {works.map((work, index) => (
            // CustomMainPageRow 컴포넌트를 작업 데이터에 맞게 생성
            <CustomMainPageRow
              key={index}
              $page="searchPage"
              // 작업 기간이 하루인 경우에는 단일 날짜를 표시하고, 아닌 경우에는 작업 기간을 표시하는 title 설정
              title={work.startDay === work.endDay ? `${work.startTime + " - " + work.endTime}` : `${work.startTime} ~ `}
              // 작업 제목을 표시
              value={work.tdTitle}
              status={work.status}
              $isButtonVisible={true}
              toggleStatus={()=>{toggleStatus(work.tdid, work.status)}}
              delRow={()=>{delRow(work.tdid)}}
            />
          ))} </div>
        </div>
      ))}

    </div>
  );
};

export default ListdayContainer;
