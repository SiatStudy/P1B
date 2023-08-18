import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ApexCharts from "react-apexcharts";
import { todoData } from "../apis/apis";
import { returnAverage, setTodoData } from "../store/todosData";

export const Graph = () => {
    const currentYear = useSelector(state => state.todosData.data);
    const dispatch = useDispatch();

    const [datas, setDatas] = useState([]);

    useEffect(() => {
        if (!currentYear) {
            todoData("/api/todos", null, "general")
                .then(res => {
                    dispatch(setTodoData(res));
                });
        }

        const fetchData = async () => {
            const averages = [];
            for (let i = 1; i < 13; i++) {
                const average = await dispatch(returnAverage(i));
                averages.push(average.count);
            }
            setDatas(averages);
        };

        fetchData();
    }, [currentYear, dispatch]);

    return (
        <ApexCharts
            type={"line"}
            series={[
                {
                    name: `${currentYear}'s 월별 달성도`,
                    data: [60, 37, 64, 45, 70, 100, 82, 31, 0, 0, 0, 0] // 변경된 부분: datas로 변경
                }
            ]}
            options={{
                chart: {
                    stacked: false,
                    height: "50%"
                },
                markers: {
                    size: 5
                },
                xaxis: {
                    categories: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]
                },
                yaxis: {
                    max: 100,
                    tickAmount: 5
                }
            }}
        />
    );
};
export default Graph;