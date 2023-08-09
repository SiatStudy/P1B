import '../landingpage/css/landing.css';
import landing from '../landingpage/img/landing.png';
import {useNavigate} from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate();

    return(
        <div>
            <div className="wrapper">
                <section>
                    <div className="content">
                        <h1>To-Do</h1>
                        <h3>: 생산성 향상을 위한 완벽한 투두리스트</h3>
                        <p className="major">
                            "끊임없는 바쁨 속에서도 효율적으로 일상을 관리할 수 있도록, <br />
                            우리의 투두리스트 앱은 기능과 간결함을 제공합니다."
                        </p>
                        <ul className="">
                            <button className="btn" onClick={() => {navigate("/loginpage")}}>Get Started</button>
                        </ul>
                    </div>
                    <div className="image">
                        <img src={landing} alt="" />
                    </div>
                </section>
	        </div>
        </div>
    )
}

export default LandingPage;