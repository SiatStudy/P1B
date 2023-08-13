import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import momentPlugin from '@fullcalendar/moment';
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import { debounce } from "../service/redux/debounce";

import { setCurrentYear } from "../store/selectedYear";
import { useSectionReturn } from "../store/userLogin";
import { findWidthObject } from "../util/dataUtils/findWidthObject";
import { todoData } from "../apis/apis";
import errorFunc from "../util/errorFunc";
import DatepickerContent from "./DatepickerContent";

import "./Datepicker.scss";
import { dummyData2 } from "../apis/dummyData2";


/**
 * Calendar 컨테이너
 * @param {Object} options - 함수에 필요한 옵션 객체
 * @param {string} options.mode - 실행 모드 ("list", "calendar")
 * @returns {Promise} Promise 객체를 반환하며, 조회 또는 성공 시 해당 결과를 반환합니다.
 */

export const Calendar = ({ mode }) => {
    const currentYear = useSelector(state => state.selectedYear);
    const dispatch = useDispatch();

    const [event, setEvent] = useState([]);
    const [width, setWidth] = useState(window.innerWidth);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleResize = () => {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const dateSetFunc = dateInfo => {
        const calendarDate = dateInfo.view.calendar.getDate();
        const Data = {
            sectionId : dispatch(useSectionReturn),
            yDate : currentYear
        }

        if(currentYear !== calendarDate.getFullYear()) {
            dispatch(setCurrentYear(calendarDate.getFullYear()));
            const url = `/todos`;
        
            todoData(url, Data, "general")
                .then(({ data }) => {
                    setEvent(data);
                })
                .catch(err => {
                    errorFunc('dataCalendar', err);
                });
        }
    };

    const handlemodal = (data) =>{
        setModalIsOpen(data);
    }

    const AddButton = {
        text : "+",
        click : function () {
            handlemodal(true)
        }
    };

    const widthObject = {
        390 : {
            headerToolbar : {
                start : "title",
                center : "",
                end : "prev next AddEvent"
            },
            dayHeaderFormat : {
                year : "numeric",
                month : "numeric"
            },
            titleFormat : "YYYY.MM"
        },
        1020 : {
            headerToolbar: {
                start : "prev next",
                center : "title",
                end : "today AddEvent"
            },
            dayHeaderFormat : {
                year : "numeric",
                month : "2-digit"
            },
            titleFormat : "YYYY.MM"
        },
        1680 : {
            headerToolbar : {
                start : "today AddEvent",
                center : "title",
                end : "dayGridMonth dayGridWeek prev next"
            },
            dayHeaderFormat : {
                year : "numeric",
                month : "2-digit"
            },
            titleFormat : "YYYY-MM"
        }
    };

    return (
        <div>
            {modalIsOpen ? <DatepickerContent onChangeModal={handlemodal} />
                :
                (mode === "calendar" ?
                        <FullCalendar
                        plugins={[dayGridPlugin, momentPlugin, interactionPlugin]}
                        headerToolbar={findWidthObject(width, widthObject).headerToolbar}
                        dayHeaderFormat={findWidthObject(width, widthObject).dayHeaderFormat}
                        titleFormat={findWidthObject(width, widthObject).titleFormat}
                        customButtons={{AddEvent: AddButton}}
                        events={event}
                        datesSet={dataInfo => dateSetFunc(dataInfo)}
                        initialView={"dayGridMonth"}
                        />
                    : <FullCalendar
                        plugins={[listPlugin, momentPlugin]}
                        headerToolbar={{
                            start : "title",
                            center : "",
                            end : ""
                        }}
                        events={[
                            {
                                id : 1,
                                title : "delectus aut autem",
                                start : "2023-08-10",
                                end : "2023-08-11",
                                state : true
                            },
                            {
                                id : 2,
                                title : "quis ut nam facilis et officia qui",
                                start : "2023-08-12",
                                end : "2023-08-13",
                                state : true
                            },
                            {
                                id : 5,
                                title : "laboriosam mollitia et enimtest2",
                                start : "2023-08-17",
                                end : "2023-08-18",
                                state : true
                            },
                            {
                                id : 6,
                                title : "illo expedita",
                                start : "2023-08-19",
                                end : "2023-08-20",
                                state : true
                            },
                            {
                                id : 7,
                                title : "quo adipisci",
                                start : "2023-08-20",
                                end : "2023-08-21",
                                state : true
                            },
                            {
                                id : 8,
                                title : "molestiae perspiciati",
                                start : "2023-08-23",
                                end : "2023-08-24",
                                state : true
                            },
                            {
                                id : 9,
                                title : "illo est ratione doloremque",
                                start : "2023-08-25",
                                end : "2023-08-26",
                                state : true
                            }
                        ]}

                        titleFormat={"YYYY.MM.({DD})"}
                        initialView={"listMonth"}
                    />
                )
            }
        </div>
    );
}
