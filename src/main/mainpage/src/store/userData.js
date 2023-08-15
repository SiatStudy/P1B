import { createSlice } from "@reduxjs/toolkit";

let userData = createSlice({
    name : "userData",
    initialState : {
        userEmail : "",
        userNickName : ""
    },
    reducers : {
        setUserEmail : (state, action) => {
            state.userEmail = action.payload;
        },
        setUserNickName : (state, action) => {
            state.userNickName = action.payload;
        }
    }
});

export const { setUserEmail, setUserNickName } = userData.actions;
export default userData.reducer;