import styled, {css} from "styled-components";

const CustomMainPageP = styled.p`
    display: flex;

    ${props => props.$navmenu && css`
        align-items: center;
        border-radius: 7px;
        color: #B2BEC3;
        font-family: Noto Sans;
        font-size: 1rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.5rem; /* 160% */
        letter-spacing: 0.3px;
    `}

    ${props => props.$navfootername && css`
        flex-shrink: 0;
        color: #2D3436;
        font-family: Noto Sans;
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.3125rem; /* 150% */
        letter-spacing: 0.0175rem;
        width: 3rem;
    `}

    ${props => props.$title && css`
        padding: 0.5rem;
        color: #3E54AC;
        font-family: Noto Sans;
        font-size: 1.875rem;
        font-style: normal;
        font-weight: 700;
        line-height: 1rem; /* 53.333% */
        flex-shrink: 0;
    `}

    ${props => props.$tableheader && css`
        display: flex;
        height: 2.5rem;
        justify-content: center;
        align-items: center;
        flex: 1 0 0;
        background: #F7FAFC;
        color: #3E54AC;
        font-family: Noto Sans;
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.3125rem; /* 150% */
        letter-spacing: 0.0175rem;
    `}
`;

export default CustomMainPageP;
