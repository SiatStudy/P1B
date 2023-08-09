import styled, {css} from "styled-components";

const CustomLoginPageBtn = styled.button`
    
    ${props => props.$findIdPWbtn && css`
        color: #B2BEC3;
        text-align: right;
        font-family: Noto Sans;
        font-size: 0.6875rem;
        font-style: normal;
        font-weight: 600;
        line-height: 1rem; /* 145.455% */
        letter-spacing: 0.02063rem;
    `}

    ${props => props.$loginbtn && css`
        display: flex;
        padding: 1rem 2.375rem;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        align-self: stretch;
        border-radius: 0.4375rem;
        text-align: center;
        font-family: Noto Sans;
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 700;
        line-height: 1rem; /* 114.286% */
        letter-spacing: 0.02625rem;
            ${props => props.$mbspbtn && css `margin-top: 1rem;`}
            ${props => props.disabled ? `
                color: #9A9A9A;
                background: #FFF;
                border: 2px solid #C2BEBE;
            `:`
                color: var(--yoda-admin-template-blacks-b-0, #FFF);
                background: #3E54AC;
            `}
    `}

    ${props => props.$membershipbtn && css`
        color: #3E54AC;
        font-family: Noto Sans;
        font-size: 0.75rem;
        font-style: normal;
        font-weight: 700;
        line-height: 1.125rem; /* 150% */
        letter-spacing: 0.0225rem;
    `}

    ${props => props.$mbspidcheck && css`
        display: flex;
        height: 3rem;
        padding: 0.5rem 1rem;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.625rem;
        border-radius: 0.4375rem;
        text-align: center;
        font-family: Manrope;
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 600;
        line-height: 1rem; /* 114.286% */
            ${props => props.$emailCertify && css`
                width : 5rem;
            `}
            ${props => props.disabled ? `
                color: #9A9A9A;
                background: #FFF;
                border: 2px solid #C2BEBE;
            `:`
                color: var(--yoda-admin-template-blacks-b-0, #FFF);
                background: #3E54AC;
            `}
    `}

    ${props => props.$findSelBtn && css`
        display: flex;
        height: 2.5rem;
        padding: 0.75rem 1.5rem;
        justify-content: center;
        align-items: center;
        gap: 0.625rem;
        flex: 1 0 0;
        border-bottom: 3px solid #3E54AC;
        background: #E3F6FF;
        color: #3E54AC;
        text-align: center;
        font-family: Noto Sans;
        font-size: 0.9375rem;
        font-style: normal;
        font-weight: 500;
        line-height: 1.5rem; /* 160% */
        letter-spacing: 0.01875rem;
            ${props => props.$resultpw && css`
                background: #FFF;
                color: var(--yoda-admin-template-blacks-b-80, #636E72);
    `}
    `}

    ${props => props.$findNoneSelBtn && css`
        background: #FFF;
        color: var(--yoda-admin-template-blacks-b-80, #636E72);
        text-align: center;
        font-family: Noto Sans;
        font-size: 0.9375rem;
        font-style: normal;
        font-weight: 500;
        line-height: 1.5rem; /* 160% */
        letter-spacing: 0.01875rem;
    `}

`;

export default CustomLoginPageBtn;