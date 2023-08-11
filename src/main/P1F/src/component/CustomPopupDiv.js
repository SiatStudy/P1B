import styled, {css} from "styled-components";

const CustomPopupDiv = styled.div`
    display: flex;
    align-self: stretch;

    ${props => props.$section && css`
        flex-direction: column;
        align-items: flex-start;
        gap: ${props => props.$incontent ? "1rem" : "0.5rem"};
        flex: 1 0 0;
    `}

    ${props => props.$outcontent && css`
        padding: 1.5rem;
        justify-content: center;
        align-items: flex-start;
        flex: 1 0 0;
    `}

    ${props => props.$header && css`
        padding: 1rem 1.5rem;
        justify-content: space-between;
        align-items: center;
        border-radius: 0.4375rem 0.4375rem 0rem 0rem;
        background: #FFF;
        box-shadow: 0px -1px 0px 0px #DFE6E9 inset;
    `}

    ${props => props.$footer && css`
        padding: 1.5rem;
        justify-content: center;
        align-items: center;
        gap: 0.625rem;
        flex-shrink: 0;
        border-radius: 0rem 0.4375rem 0.4375rem 0.4375rem;
        background: #FFF;
        box-shadow: 0px 1px 0px 0px #DFE6E9 inset;
    `}

    ${props => props.$headertitle && css`
        flex-direction: column;
        align-items: flex-start;
        flex: 1 0 0;
        color: #3E54AC;
        font-family: Noto Sans, serif;
        font-size: 1rem;
        font-style: normal;
        font-weight: 500;
        line-height: 1.5rem; /* 150% */
        letter-spacing: 0.02rem;
    `}
`;

export default CustomPopupDiv;