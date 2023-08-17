import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import momentPlugin from '@fullcalendar/moment';
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import { debounce } from "../service/redux/debounce";

import { setCurrentYear } from "../store/selectedYear";
import {setTodoData} from "../store/todoData";
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
    const userEvent = useSelector(state => state.todosData);
    const dispatch = useDispatch();

    const [event, setEvent] = useState([ ...userEvent]);
    const [width, setWidth] = useState(window.innerWidth);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleResize = () => {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        if(userEvent.data.length === 0) {
            todoData("/api/todos", null, "general").then(r => {
                setEvent(r);
                dispatch(setTodoData(r));
            });
        }
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

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
                        initialView={"dayGridMonth"}
                        />
                    : <FullCalendar
                        plugins={[listPlugin, momentPlugin]}
                        headerToolbar={{
                            start : "title",
                            center : "",
                            end : ""
                        }}
                        events={event}

                        titleFormat={"YYYY.MM.({DD})"}
                        initialView={"listMonth"}
                    />
                )
            }
        </div>
    );
}
