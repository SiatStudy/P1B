import {useDispatch, useSelector} from "react-redux";

import ApexCharts from "react-apexcharts";
import {resetYear} from "../store/selectedYear";

// import dataAverage from "../util/dataUtils/dataAverage";

export const Graph = () => {
    const currentYear = useSelector(state => state.selectedYear);
    const dispatch = useDispatch();

    dispatch(resetYear());

    return (
        <ApexCharts
            type={"line"}
            series={[
                {
                    name : `${currentYear}'s 월별 달성도`,
                    data : [19, 26, 20, 100, 12, 69, 32, 9, 0, 0, 0, 0]
                }
            ]}
            options={{
                chart : {
                    stacked : false,
                    height : "50%"
                },
                markers : {
                    size : 5
                },
                xaxis : {
                    categories : ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]
                },
                yaxis : {
                    max : 100,
                    tickAmount : 5
                }
            }}
        />
    );
}


export default Graph;