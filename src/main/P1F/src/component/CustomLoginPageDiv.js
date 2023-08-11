import styled, {css} from "styled-components";

const CustomLoginPageDiv = styled.div`
    
    ${props => props.$logindiv && css `
        display: flex;
        width: 22.5rem;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1.4375rem;
        flex-shrink: 0;
    `}

    ${props => props.$haedertext && css`
        align-self: stretch;
        color: #3E54AC;
        text-align: center;
        font-family: Noto Sans;
        font-size: 2.625rem;
        font-style: normal;
        font-weight: 600;
        line-height: 3rem; /* 114.286% */
        letter-spacing: -0.0525rem;

            ${props => props.$emailVerificationDiv && css`
                font-size : 2.34rem;
            `}
    `}

    ${props => props.$idpwsection && css`
        display: flex;
        height: 4.5rem;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
        align-self: stretch;
            ${props => props.$findidsection && css `
                margin : 5.37rem 0 5.37rem 0;
            `}
            ${props => props.$findpwsection && css `
                margin : 1.2rem 0 1.2rem 0;
            `}
    `}

    ${props => props.$find && css`
        display: flex;
        padding: 0rem 0.3125rem;
        justify-content: flex-end;
        align-items: flex-end;
        gap: 0.3125rem;
        align-self: stretch;
        color: #B2BEC3;
        font-family: Noto Sans;
        font-size: 0.6875rem;
        font-style: normal;
        font-weight: 600;
        line-height: 1rem; /* 145.455% */
        letter-spacing: 0.02063rem;
    `}

    ${props => props.$membershipsection && css`
        display: flex;
        align-items: center;
        gap: 0.25rem;
        align-self: stretch;
        color: var(--yoda-admin-template-blacks-b-80, #636E72);
        font-family: Noto Sans;
        font-size: 0.75rem;
        font-style: normal;
        font-weight: 700;
        line-height: 1.125rem; /* 150% */
        letter-spacing: 0.0225rem;
    `}

    ${props => props.$pwinputdiv && css`
        display: flex;
        align-items: center;
        flex: 1 0 0;
        align-self: stretch;
    `}

    ${props => props.$mbidsection && css`
    display: flex;
    height: 4.5rem;
    align-items: flex-end;
    gap: 0.4375rem;
    align-self: stretch;
    `}

    ${props => props.$mbidlabelinp && css`
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
        flex: 1 0 0;
        align-self: stretch;
    `}

    ${props => props.$mbemail && css`
    display: flex;
    margin-top: 1.3rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.625rem;
    align-self: stretch;
    color: #9A9A9A;
    text-align: center;
    font-family: Noto Sans;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1rem; /* 114.286% */
    `}

    ${props => props.$findIdPW && css`
    display: flex;
    height: 2.5rem;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    align-self: stretch;
    `}
`;

export default CustomLoginPageDiv;