import {Route, Routes} from 'react-router-dom';
import LoginPage from './page/LoginPage';
import SignUpPage from './page/SignUpPage';
import FindIdPage from './page/FindIdPage';
import FindPWPage from './page/FindPWPage';
import FindIdResult from "./page/FindIdResult";
import FindPWResult from "./page/FindPWResult";
import LandingPage from './page/LandingPage';


function App() {

  return (
    <div>
      <Routes>
        <Route path={"/"} element={<LandingPage />}></Route>
        <Route path={"/loginpage"} element={<LoginPage />}></Route>
        <Route path={"/signuppage"} element={<SignUpPage />}></Route>
        <Route path={"/findidpage"} element={<FindIdPage />}></Route>
        <Route path={"/findpwpage"} element={<FindPWPage />}></Route>
        <Route path={"/findidresult"} element={<FindIdResult />}></Route>
        <Route path={"/findpwresult"} element={<FindPWResult />}></Route>
        <Route path={'*'} element={<h1>잘못된 페이지 호출입니다.</h1>}></Route>
      </Routes>
    </div>
  );
}

export default App;
