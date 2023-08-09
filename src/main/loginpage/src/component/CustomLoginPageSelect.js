import styled, {css} from "styled-components";

const CustomLoginPageSelect = styled.select`

${props => props.$mbemail && css`
display: flex;
width: 9.3125rem;
margin-top: 1.5rem;
padding: 0.5rem 0.5rem 0.5rem 1rem;
align-items: center;
align-self: stretch;
gap: 3.4375rem;
border-radius: 0.4375rem;
border: 2px solid #C2BEBE;
background: var(--yoda-admin-template-blacks-b-0, #FFF);
color: #111314;
font-family: Noto Sans;
font-size: 0.6875rem;
font-style: normal;
font-weight: 500;
line-height: 1rem;
cursor: pointer;
`}
`;

export default CustomLoginPageSelect;