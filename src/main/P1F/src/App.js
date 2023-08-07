// import logo from './logo.svg';
// import './App.css';
import Comp1 from "./comp/Comp1";
import AboutPage from "./comp/AboutPage";
import {Link, Route, Routes} from "react-router-dom";

function App() {
  return (
      <div>
          <Routes>
              <Route path={"/"} element={<Comp1/>}></Route>
              <Route path={"/AboutPage"} element={<AboutPage/>}></Route>
          </Routes>
        <div>
          <hr />
        </div>
          <div>
              <h1>페이지 이동</h1>
              <ul>
                  <li><Link to={"/"}>Comp1</Link></li>
                  <li><Link to={"/AboutPage"}>AboutPage</Link></li>
              </ul>
          </div>
      </div>
  );
}

export default App;
