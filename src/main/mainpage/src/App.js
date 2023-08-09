import './App.css';
import React from 'react';
import {Route, Routes} from "react-router-dom";
import CalendarP from './page/CalendarP';
import GraphP from './page/GraphP';
import Listday from './page/Listday';
import Dday from './page/Dday';

function App() {

    return (
        <div>
            <Routes>
                <Route path={"/"} element={<Listday />} />
                <Route path={"/Listday"} element={<Listday />} />
                <Route path={"/CalendarP"} element={<CalendarP />} />
                <Route path={"/Dday"} element={<Dday />} />
                <Route path={"/GraphP"} element={<GraphP />} />
            </Routes>
        </div>
    );
}

export default App;