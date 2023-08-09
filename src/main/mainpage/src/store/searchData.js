import { createSlice } from "@reduxjs/toolkit";

let searchData = createSlice({
    name : "searchData",
    initialState : {
        search : ""
    },
    reducers : {
        setSearchData : (state, action) => {
            state.search = action.payload;
        },
        returnData : (state, action) => {
            return state.search;
        }
    }
});

export const { setSearchData, returnData } = searchData.actions;
export default searchData.reducer;