import React, { useState, forwardRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import './Datepicker.scss';
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { getYear,getMonth } from "date-fns";
import { ReactComponent as Vector} from "./svg/Vector.svg";
import { ReactComponent as Closefill } from "./svg/Closefill.svg";
import { ReactComponent as LeftArrow } from "./svg/LeftArrow.svg";
import { ReactComponent as RightArrow } from "./svg/RightArrow.svg";
import CustomPopupBtn from "../component/CustomPopupBtn";
import CustomPopupInput from "../component/CustomPopupInput";
import CustomPopupLabel from "../component/CustomPopupLabel";
import CustomPopupArea from "../component/CustomPopupArea";
import CustomPopupDiv from "../component/CustomPopupDiv";
import style from './DatepickerModal.module.scss';
import errorFunc from "../util/errorFunc";
import { useDispatch } from "react-redux";
import { addTodoData } from "../store/todosData";
import axios from "axios";

const DatepickerContent = ({ onChangeModal, editingData }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [disabled, setDisabled] = useState(true);
    const [titleVal, setTitleVal] = useState("");
    const [memoVal, setMemoVal] = useState("");
    const [show, setShow] = useState(false);
    const ExampleCustomInput = forwardRef(({ value, onClick}, ref) => (
        <>
            <CustomPopupBtn type="button" $datepickerButton onClick={onClick} ref={ref}>
                {value}
            </CustomPopupBtn>
            <Vector className="Vt-custom" onClick={onClick}/>
        </>
    ));
    const dispatch = useDispatch();

    useEffect(() => {
        if (editingData) {
            setStartDate(new Date(editingData.startDate));
            setEndDate(new Date(editingData.endDate));
            setTitleVal(editingData.title);
            setMemoVal(editingData.content);
        }
    }, [editingData]);

    const handleChangeTitle = (event) => {
        const value = event.target.value;
        setTitleVal(value);

        if(value.trim() === ""){
            setDisabled(true);
        } else{
            setDisabled(false);
        }
    }
    const handleChangeMemo = ({ target : {value}}) => setMemoVal(value);

    const filterDate = (date) =>{
        const currentDate = new Date();
        const selectedDate = new Date(date);

        return currentDate < selectedDate;
    }

    // startDate 백으로 보낼 데이터
    const remakeStartDate = startDate.getFullYear() + '-' + (startDate.getMonth()+1).toString().padStart(2, '0') + '-' + startDate.getDate() + 'T' + startDate.getHours().toString().padStart(2, '0') + ':' + startDate.getMinutes().toString().padStart(2, '0') + ':' + startDate.getSeconds().toString().padStart(2, '0');
    // endDate 백으로 보낼 데이터
    const remakeEndDate = endDate.getFullYear() + '-' + (endDate.getMonth()+1).toString().padStart(2, '0') + '-' + endDate.getDate() + 'T' + endDate.getHours().toString().padStart(2, '0') + ':' + endDate.getMinutes().toString().padStart(2, '0')  + ':' + startDate.getSeconds().toString().padStart(2, '0');
    const startMonth = startDate.getMonth()+1;
    const reduxStartDate = startDate.getFullYear() + '-' + (startDate.getMonth()+1).toString().padStart(2, '0') + '-' + startDate.getDate();
    const reduxEndDate = endDate.getFullYear() + '-' + (endDate.getMonth()+1).toString().padStart(2, '0') + '-' + endDate.getDate();

    const dpCustomHeader = ({
                                date,
                                decreaseMonth,
                                increaseMonth,
                                prevMonthButtonDisabled,
                                nextMonthButtonDisabled,
                            }) => (
        <div className="customHeaderContainer">
            <LeftArrow
                type="button"
                onClick={decreaseMonth}
                className="arrowMonthButton"
                disabled={prevMonthButtonDisabled}
            />
            <div className="dpmonth">{getYear(date)}년 {getMonth(date)+1}월</div>
            <RightArrow
                type="button"
                onClick={increaseMonth}
                className="arrowMonthButton"
                disabled={nextMonthButtonDisabled}
            />
        </div>
    )

    const handleSubmit = (event) => { // form 전송
        event.preventDefault();
        onChangeModal(false);

        if(startDate <= endDate){
            if(editingData){
                axios.put(`http://localhost:8080/api/todos/item/changetodos`, { // 수정 API 엔드포인트
                    title: titleVal,
                    startDate: remakeStartDate,
                    endDate: remakeEndDate,
                    content: memoVal,
                })
                    .then(res => {
                        if (res.data.isValid) {
                            // 수정된 데이터를 업데이트하는 로직 (Redux 또는 상태 관리)
                        } else {
                            console.log("Error: 데이터 수정 실패");
                        }
                    })
                    .catch(err => {
                        // 에러 핸들링
                        errorFunc('[ERROR] DatepickerContent', err);
                    });
            } else {
                axios.post("http://localhost:8080/api/todos/item", {
                    title : titleVal,
                    startDate : remakeStartDate,
                    endDate : remakeEndDate,
                    content : memoVal,
                })
                    .then(res => {
                        if(res.data.isValid){
                            dispatch(addTodoData([{
                                tdid : res.data.tdid, // 할일 아이디
                                tdstartDate: reduxStartDate, // 시작날짜
                                tdendDate: reduxEndDate,   // 끝 날짜
                                tdtitle: titleVal, // 제목
                                tdendDate : memoVal,
                                status : 0,
                            }]));
                        }else{
                            console.log("Error : 데이터 받기 실패");
                        }
                    })
                    .catch(err => {
                        // 에러 핸들링을 위해 errorFunc 유틸리티 사용
                        errorFunc('[ERROR] DatepickerContent', err)
                    })
            }
        } else { // 데이터 오입력시
            event.preventDefault();
            setShow(true);
        }
    }

    return (
        <>
            <div className={style.modalCustom}>
                <CustomPopupDiv $header>
                    <CustomPopupDiv $headertitle>일정</CustomPopupDiv>
                    <Closefill onClick={()=>onChangeModal(false)} className="closefill-custom"></Closefill>
                </CustomPopupDiv>

                <form onSubmit={handleSubmit}>
                    <CustomPopupDiv $outcontent>
                        <CustomPopupDiv $section $incontent>
                            <CustomPopupDiv $section>
                                <CustomPopupLabel>제목<p className="title-p-tag">* 필수 입력란</p></CustomPopupLabel>
                                <CustomPopupInput type="text" value={titleVal} onChange={handleChangeTitle} required />
                            </CustomPopupDiv>

                            <CustomPopupDiv $section>
                                <CustomPopupLabel>시작</CustomPopupLabel>
                                <DatePicker
                                    locale={ko}
                                    selected={startDate}
                                    onChange={(date)=>setStartDate(date)}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={30}
                                    timeCaption="시간"
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                    customInput={<ExampleCustomInput />}
                                    filterDate={filterDate}
                                    dateFormat="yyyy-MM-dd HH:mm"
                                    renderCustomHeader={dpCustomHeader}
                                />
                            </CustomPopupDiv>

                            <CustomPopupDiv $section>
                                <CustomPopupLabel>종료</CustomPopupLabel>
                                <DatePicker
                                    locale={ko}
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={30}
                                    timeCaption="시간"
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={startDate}
                                    customInput={<ExampleCustomInput />}
                                    dateFormat="yyyy-MM-dd HH:mm"
                                    renderCustomHeader={dpCustomHeader}
                                />
                                {show && <span className="reSelectEndDate">종료 날짜를 다시 선택해 주세요.</span>}
                            </CustomPopupDiv>

                            <CustomPopupDiv $section>
                                <CustomPopupLabel>메모</CustomPopupLabel>
                                <CustomPopupArea type="text" placeholder="메모를 추가해보세요." value={memoVal} onChange={handleChangeMemo} />
                            </CustomPopupDiv>
                        </CustomPopupDiv>
                    </CustomPopupDiv>

                    <CustomPopupDiv $footer>
                        <CustomPopupBtn $footerButton $btncancel type="button" onClick={()=>onChangeModal(false)}>취소</CustomPopupBtn>
                        <CustomPopupBtn $footerButton type="submit" disabled={disabled} >저장</CustomPopupBtn>
                    </CustomPopupDiv>
                </form>
            </div>
        </>
    );
};

export default DatepickerContent;