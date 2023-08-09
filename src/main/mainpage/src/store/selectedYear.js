import { createSlice } from "@reduxjs/toolkit";

let selectedYear = createSlice({
    name : "currentYear",
    initialState : {
        selectedYear : new Date().getFullYear().toString()
    },
    reducers : {
        setCurrentYear : (state, action) => {
            state.selectedYear = action.payload;
        },
        resetYear : (state, action) => {
            state.selectedYear = new Date().getFullYear().toString();
        },
        returnYear : (state, action) => {
            return state.selectedYear;
        }
    }
});

export const { setCurrentYear, resetYear, returnYear } = selectedYear.actions;
export default selectedYear.reducer;