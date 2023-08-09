import styled, {css} from "styled-components";

const CustomMainPageInput = styled.input`
    display: flex;

    ${props => props.$headerinput && css`
        width: 100%;
        border: 1px solid #bbb;
        border-radius: 0.5rem;
        padding: 0.625rem 0.625rem;
        font-size: 0.875rem;
    `}
`;

export default CustomMainPageInput;