import styled, {css} from "styled-components";

const CustomLoginPageLabel = styled.label`
    
    ${props => props.$idlabel && css`
    display: flex;
    align-items: flex-start;
    gap: 0.25rem;
    align-self: stretch;
    color: var(--yoda-admin-template-blacks-b-100, #2D3436);
font-family: Noto Sans;
font-size: 0.875rem;
font-style: normal;
font-weight: 500;
line-height: 1rem; /* 114.286% */
    `}
`;

export default CustomLoginPageLabel;