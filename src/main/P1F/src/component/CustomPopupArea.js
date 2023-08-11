import styled from "styled-components";

const CustomPopupArea = styled.textarea`
    display: flex;
    height: 5.625rem;
    padding: 0.5rem 0.75rem;
    justify-content: flex-end;
    align-items: flex-start;
    gap: 0.6875rem;
    align-self: stretch;
    border-radius: 0.4375rem;
    border: 1px solid var(--yoda-admin-template-blacks-b-40, #DFE6E9);
    background: var(--yoda-admin-template-blacks-b-0, #FFF);
    color: #111314;
    font-family: Noto Sans;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 300;
    line-height: 1rem; /* 114.286% */
    letter-spacing: 0.0875rem;
    resize: none;
`;

export default CustomPopupArea;