import styled, {css} from "styled-components";

const CustomMainPageProgress = styled.progress`
    display: flex;
    

    ${props => props.$progressbar && css`
    flex-grow: 1;
    `}
`;

export default CustomMainPageProgress;