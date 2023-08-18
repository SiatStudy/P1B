import {createSlice} from "@reduxjs/toolkit";

let todosData = createSlice({
    name : "todosData",
    initialState : {
        data : []
    },
    reducers : {
        setTodoData : (state, action) => {
            //백엔드에서 todo데이터 객체 배열 생성 함수
            state.data = action.payload;
        },
        addTodoData : (state, action) => {
            //할일 추가 시 객체를 받아 배열에 추가하는 함수
            const newData = [ ...state.data, ...action.payload ];
            state.data = newData;
        },
        //action = { id : todoId, data : { todoData }}
        modifyTodoData : (state, action) => {
            // 어떤 기준으로 수정하는지
            // 할일 수정 시 수정할 tdid, 변경할 키값, 변경할 value 받아서 수정
            const { id, data } = action.payload;

            const newData = state.data.map(item =>
                item.id === id ? { ...item, ...data } : item
            );

            state.data = newData;
        },
        //action = id
        delTodoData : (state, action) => {
            // 어떤 기준으로 삭제하는지
            // 할일 삭제 시 삭제할 tdid 받아서 삭제
            const id = action.payload;
            const newData = state.data.filter(item => item.id !== id);
            state.data = newData;
        },
        returnAverage : (state, action) => {
            const month = state.data.filter(item => item.month === action.payload);
            const filteredItems = state.data.filter(item => item.month === action.payload && item.status);

            return filteredItems.length / month.length;
        }
    } // 이렇게 추가, 수정, 삭제하는 axios api로직도 만들어야됨KsK
});

export const { setTodoData, addTodoData, modifyTodoData, delTodoData, returnAverage } = todosData.actions;
export default todosData.reducer;