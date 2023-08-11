import styled, {css} from "styled-components";

const CustomPopupBtn = styled.button`
    display: flex;
    align-items: center;
    flex: 1 0 0;
    font-family: Noto Sans, serif;
    font-size: 0.875rem;
    font-style: normal;
    line-height: 1rem;

    ${props => props.$datepickerButton && css`
        gap: 0.5rem;
        color: #111314;
        font-weight: 300;
        letter-spacing: 0.0875rem;
    `}

    ${props => props.$footerButton && css`
        padding: 0.75rem 1.5rem;
        flex-direction: column;
        justify-content: center;
        align-self: stretch;
        border-radius: 0.4375rem;
        background: ${props => props.$btncancel ? "#FFF" : props.disabled ? "#F0F3F5" : "#3E54AC"};
        border: ${props => props.$btncancel ? "1px solid #3E54AC" : "1px solid #FFFFFF"};
        color: ${props => props.$btncancel ? "#3E54AC" : props.disabled ? "#B2BEC3" : "#FFF"};
        text-align: center;
        font-weight: 500;
        letter-spacing: 0.02625rem;
        cursor : ${props => props.disabled ? "default" : "pointer"};
        pointer-events : ${props => props.disabled ? "none" : "auto"}; 
    `}
`;

export default CustomPopupBtn;