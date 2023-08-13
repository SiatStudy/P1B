import styled, {css} from "styled-components";

const CustomMainPageProgress = styled.progress`
    display: flex;
    

    ${props => props.$progressbar && css`
    flex-grow: 1;
    width: 100%;
    `}
`;

export default CustomMainPageProgress;