import React, { useState, forwardRef } from "react";
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

const DatepickerContent = ({ onChangeModal }) => {
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
    const remakeStartDate = startDate.getFullYear() + '-' + (startDate.getMonth()+1) + '-' + startDate.getDate() + ' ' + startDate.getHours().toString().padStart(2, '0') + ':' + startDate.getMinutes().toString().padStart(2, '0');
    // endDate 백으로 보낼 데이터
    const remakeEndDate = endDate.getFullYear() + '-' + (endDate.getMonth()+1) + '-' + endDate.getDate() + ' ' + endDate.getHours().toString().padStart(2, '0') + ':' + endDate.getMinutes().toString().padStart(2, '0');

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
        if(startDate <= endDate){
            event.preventDefault();
            onChangeModal(false);
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