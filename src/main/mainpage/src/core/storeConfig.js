import { configureStore } from "@reduxjs/toolkit";

import userLoginReducer from "../store/userLogin";
import selectedYearReducer from "../store/selectedYear";
import searchDataReducer from "../store/searchData";

export default configureStore({
   reducer : {
       userLogin : userLoginReducer,
       selectedYear : selectedYearReducer,
       searchData : searchDataReducer
   }
});