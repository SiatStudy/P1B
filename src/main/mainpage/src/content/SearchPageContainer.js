import React, { useState, useEffect } from 'react';
import style from './SearchPageContainer.module.css'
import CustomMainPageH1 from '../component/CustomMainPageH1';
import CustomMainPageRow from '../component/CustomManinPageRow';
import { dummyData2 } from '../apis/dummyData2';
import { connectTodoData } from '../apis/apis';
import { useSelector } from 'react-redux';
import { dummyData4 } from '../apis/dummyData4';

const SearchPageContainer = ({ word }) => {
  const [searchDataArr, setSearchDataArr] = useState([]);
  const todoData = useSelector((state) => state.todoData);
  const date = new Date();
  let currentMonth = date.getMonth()+1;
  let currentYear = date.getFullYear();

  //처음 랜더링 시에만 실행
  useEffect(() => {
    //더미데이터 가져옴. 본 사용시 아래 settingReduxData사용 
    // setSearchDataArr(dummyData2);  
    settingReduxData();
  }, []);

  //리덕스 데이터 세팅
  const settingReduxData = () => {
    //startDate : 시작일
    //endDate : 종료일
    //title : 일 제목
    // 리덕스에서 받기
    // let data = todoData;
    // 더미값 받기
    let data = dummyData4;

    // 백엔드에서 받은 배열을 알맞은 형태로 재생성하는 로직
    const transformeArr = data.map(item => {
      const { tdTitle, tdStartDate } = item;
      const startDateObj = new Date(tdStartDate);
      return {
        month: startDateObj.getMonth() + 1,
        startDay: startDateObj.getDate(),
        endDay: new Date(item.tdEndDate).getDate(),
        tdTitle: tdTitle
      };
    });
    setSearchDataArr(transformeArr);
  }

  // 월별 작업 데이터 정렬 및 필터링하는 함수
  const getFilteredData = () => {
    const regex = new RegExp(word, "gi");
    let IncludeWordData = searchDataArr.filter(obj => (obj.tdTitle.match(regex)));

    // 데이터 정렬 (낮은 순으로 정렬 -> 같은 월일 경우 startDay로 정렬 -> 같은 월, startDay일 경우 endDay로 정렬)
    const sortedData = IncludeWordData.sort((a, b) => {
      if (a.month !== b.month) {
        return a.month - b.month;
      } else if (a.startDay !== b.startDay) {
        return a.startDay - b.startDay;
      } else {
        return a.endDay - b.endDay;
      }
    });

    // 정렬된 데이터를 월별로 그룹화
    const groupedData = {};
    sortedData.forEach((data) => {
      const { month } = data;
      if (!groupedData[month]) {
        groupedData[month] = [];
      }
      groupedData[month].push(data);
    });

    // 각 월별로 최대 3개까지만 출력하도록 필터링
    const filteredData = Object.entries(groupedData).reduce((acc, [month, data]) => {
      if (parseInt(month, 10) >= (currentMonth - 1) && parseInt(month, 10) <= (currentMonth + 1)) {
        acc[month] = data.slice(0, 3);
      }
      return acc;
    }, {});
    return filteredData;
  };

  const filteredData = getFilteredData();

  return (
    <div className={style.mainContainer}>
      {/* 월별로 그룹화된 작업 데이터 순회 (각 월별 작업 표시) */}
      {Object.entries(filteredData).map(([month, works]) => (
        // 각 월별 컨테이너 생성 (월의 이름을 key로 설정)
        <div className={style.searchMonth} key={month}>
          {/* 월별 컨테이너 제목 영역 */}
          <div className={style.titleDiv}>
            {/* 월의 이름 표시 */}
            <div className={style.monthTitle}>{month}월</div>
            {/* CustomMainPageH1 컴포넌트는 특정 스타일을 적용하는 역할로 사용 */}
            <CustomMainPageH1 $searchPageYear>{currentYear}</CustomMainPageH1>
          </div>
          {/* 월별로 그룹화된 작업 데이터 순회 (작업별 CustomMainPageRow 컴포넌트 생성) */}
          {works.map((work, index) => (
            // CustomMainPageRow 컴포넌트를 작업 데이터에 맞게 생성
            <CustomMainPageRow
              key={index}
              $page="searchPage"
              // 작업 기간이 하루인 경우에는 단일 날짜를 표시하고, 아닌 경우에는 작업 기간을 표시하는 title 설정
              title={work.startDay === work.endDay ? `${work.startDay}일` : `${work.startDay}일 - ${work.endDay}일`}
              // 작업 제목을 표시
              value={work.tdTitle}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SearchPageContainer;
