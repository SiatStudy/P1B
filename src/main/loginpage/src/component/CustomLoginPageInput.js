import styled, {css} from "styled-components";

const CustomLoginPageInput = styled.input`

padding-left: 0.7rem;

${props => props.$idinput && css`
display: flex;
flex-direction: column;
align-items: center;
gap: 0.25rem;
flex: 1 0 0;
align-self: stretch;
color: var(--yoda-admin-template-blacks-dark-bg, #111314);
border-radius: 0.4375rem;
border: 2px solid rgba(0, 0, 0, 0.20);
background: var(--yoda-admin-template-blacks-b-0, #FFF);
font-family: Noto Sans;
font-size: 0.875rem;
font-style: normal;
font-weight: 300;
line-height: 1rem; /* 114.286% */
letter-spacing: 0.04375rem;

    ${props => props.$signupemail && css`
        width : 8rem;
    `}
`}

${props => props.$pwinput && css`
display: flex;
margin-right: -2.27rem;
justify-content: space-between;
align-items: center;
flex: 1 0 0;
align-self: stretch;
color: var(--yoda-admin-template-blacks-dark-bg, #111314);
border-radius: 0.4375rem;
border: 2px solid rgba(0, 0, 0, 0.20);
background: var(--yoda-admin-template-blacks-b-0, #FFF);
font-family: Noto Sans;
font-size: 0.875rem;
font-style: normal;
font-weight: 300;
line-height: 1rem; /* 114.286% */
letter-spacing: 0.04375rem;
`}

${props => props.$mbspid && css`
display: flex;
flex-direction: column;
align-items: center;
gap: 0.25rem;
flex: 1 0 0;
align-self: stretch;
color: var(--yoda-admin-template-blacks-dark-bg, #111314);
border-radius: 0.4375rem;
border: 2px solid rgba(0, 0, 0, 0.20);
background: var(--yoda-admin-template-blacks-b-0, #FFF);
font-family: Noto Sans;
font-size: 0.875rem;
font-style: normal;
font-weight: 300;
line-height: 1rem; /* 114.286% */
letter-spacing: 0.04375rem;
`}

${props => props.$mbemail && css`
display: flex;
width: 9.3125rem;
margin-top: 1.5rem;
flex-direction: column;
justify-content: center;
align-items: flex-start;
align-self: stretch;
border-radius: 0.4375rem;
border: 2px solid #C2BEBE;
background: var(--yoda-admin-template-blacks-b-0, #FFF);
`}

`;

export default CustomLoginPageInput;