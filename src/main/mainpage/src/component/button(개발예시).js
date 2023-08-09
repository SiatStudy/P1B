export const Btn = ({ mode, type, icon, val }) => {
    
    const BtnObj = {
        "general" : {
            type : "button",
            txt : "Btn",
            styled : ""
        },
        "loginBtn" : {
            type : "submit",
            txt : "login",
            offStyled : "",
            onStyled : ""
        },
        "socialLoginBtn" : {
            type : "submit",
            txt : type ? type : null,
            icon : icon,
            offStyled : "",
            onStyled : ""
        }
    };
    
    return (
        <>
            {BtnObj[mode].icon ? <i className={icon} /> : null }
            <button type={BtnObj[mode].type} style={func(val)}>{BtnObj[mode].txt}</button>
        </>
    )
}

// app.js 에서 호출 할때는 <Btn {mode}, {type}, {icon}, {val1}></Btn> 으로 호출