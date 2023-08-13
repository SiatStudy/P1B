import styled, {css} from "styled-components";

const CustomMainPageLabel = styled.label`
    display: flex;


    ${props => props.$progressl && css`
        justify-content: center;
        color: var(--yoda-admin-template-blacks-b-100, #2D3436);
        text-align: center;
        font-family: Noto Sans;
        font-size: 0.625rem;
        font-style: normal;
        font-weight: 300;
        line-height: 1.3125rem; /* 210% */
        letter-spacing: 0.01875rem;
        width: 3.5rem;
    `}

    ${props => props.$progressunder && css`
        color: #000;
        text-align: center;
        font-family: Noto Sans;
        font-size: 0.75rem;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        text-transform: uppercase;
`}

    ${props => props.$progressr && css`
        color: #3E54AC;
        text-align: center;
        font-family: Noto Sans;
        font-size: 0.75rem;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        text-transform: uppercase;
    `}
`;

export default CustomMainPageLabel;