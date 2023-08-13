import { createSlice } from "@reduxjs/toolkit";

let userLogIn = createSlice({
    name : "userLogin",
    initialState : {
        sectionID : "",
        emailVerified : false,
        userLogin : false
    },
    reducers : {
        userLogin : (state, action) => {
            state.sectionID = action.payload;
            state.userLogin = true;
        },
        userLogout : (state, action) => {
            state.sectionID = "";
            state.userLogin = false;
        },
        userEmailAdd : (state, action) => {
            state.emailVerfied = true;
        },
        userEmailReturn : (state, action) => {
            return state.emailVerfied;
        },
        useSectionReturn : (state, action) => {
            return state.sectionID;
        }
    }
});

export const { userLogin, userLogout, userEmailAdd, userEmailReturn, useSectionReturn } = userLogIn.actions;
export default userLogIn.reducer;