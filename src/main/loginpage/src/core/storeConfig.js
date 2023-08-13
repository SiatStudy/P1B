import { configureStore } from "@reduxjs/toolkit";

import userLoginReducer from "../store/userLogin";
import selectedYearReducer from "../store/selectedYear";
import searchDataReducer from "../store/searchData";
import userDataReducer from "../store/userData";
import todoDataReducer from "../store/todoData";

export default configureStore({
   reducer : {
       userLogin : userLoginReducer,
       selectedYear : selectedYearReducer,
       searchData : searchDataReducer,
       userData : userDataReducer,
       todoData : todoDataReducer
   }
});