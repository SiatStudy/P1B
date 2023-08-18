import React, { useEffect, useState } from "react";
import style from "./DdayTable.module.css";
import CustomMainPageDiv from "../component/CustomMainPageDiv";
import CustomMainPageP from "../component/CustomMainPageP";
import { useSelector } from "react-redux";

// 목표 달성 페이지 테이블
function DdayTable(props) {
  const [todoDataArr, setTodoDataArr] = useState([]);
  const ListDaytodosData = useSelector(state => state.todosData.data);
  let currentMonth = new Date().getMonth() + 1;

  useEffect(() => {
    settingReduxData();
  }, [ListDaytodosData]);

  //리덕스 데이터 세팅
  const settingReduxData = () => {
    // 리덕스에서 받기
      let transformeArr = ListDaytodosData.map(item => ({
          tdid: item.tdid,
          today: new Date(item.tdstartDate).getFullYear() + '년 ' + (new Date(item.tdstartDate).getMonth()+1).toString().padStart(2, '0') + '월 ' + new Date(item.tdstartDate).getDate() + '일',
          month: new Date(item.tdstartDate).getMonth() + 1,
          startDay: new Date(item.tdstartDate).getDate(),
          startTime: new Date(item.tdstartDate).getHours().toString().padStart(2, '0') + ':' + new Date(item.tdstartDate).getMinutes().toString().padStart(2, '0'),
          endDay: new Date(item.tdendDate).getDate(),
          endTime: new Date(item.tdendDate).getHours().toString().padStart(2, '0') + ':' + new Date(item.tdendDate).getMinutes().toString().padStart(2, '0'),
          endDate: new Date(item.tdendDate),
          tdTitle: item.tdtitle,
          status: item.status
      }));
      transformeArr = transformeArr.filter(item => { return item.month === currentMonth });
      setTodoDataArr(transformeArr);
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

    const arr1 = sortedData.map(item => {
      // 두 날짜의 차이를 밀리초 단위로 계산
      const timeDiffMillis = item.endDate - (new Date());
      // 밀리초를 일로 변환 (1일 = 24시간 * 60분 * 60초 * 1000밀리초)
      let daysDiff = parseInt(timeDiffMillis / (24 * 60 * 60 * 1000));
      if (daysDiff >= 0) {
        daysDiff = "D-" + Math.abs(daysDiff);
      } else {
        daysDiff = "D+" + Math.abs(daysDiff);
      }
      return {
        text1: item.today,
        text2: item.tdTitle,
        text3: daysDiff
      }
    });
    return arr1;
  };
  const array1 = getFilteredData();

  return (
    <div className={style.DdayTable}>
      <div className={style.MonthYear}>
        <CustomMainPageDiv $month>{props.month}</CustomMainPageDiv>
        <CustomMainPageDiv $year>{props.year}</CustomMainPageDiv>
      </div>
      <div className={style.Table}>
        <div className={style.TableHeader}>
          <CustomMainPageP $tableheader>작성 날짜</CustomMainPageP>
          <CustomMainPageP $tableheader>작업명</CustomMainPageP>
          <CustomMainPageP $tableheader>D-DAY</CustomMainPageP>
        </div>
        <div className={style.TableMain}>
          {array1.map((str, i) => (<div key={i} className={style.TableInner}>
            <CustomMainPageDiv $t1>{str.text1}</CustomMainPageDiv>
            <CustomMainPageDiv $t1>{str.text2}</CustomMainPageDiv>
            <CustomMainPageDiv $t2>{str.text3}</CustomMainPageDiv>
          </div>))}
        </div>
      </div>
    </div>
  )
}

export default DdayTable;