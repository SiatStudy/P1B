import styled, {css} from "styled-components";

const CustomMainPageImg = styled.img`
    display: flex;

    ${props => props.$navbotpic && css`
        width: 14.25rem;
        height: 16.3125rem;
    `}

    ${props => props.$navfooterava && css`
        width: 2rem;
        height: 2rem;
    `}

    ${props => props.$navfooterset && css`
        width: 1.5rem;
        height: 1.5rem;
    `}

    ${props => props.$headerinputicon && css`
        position: absolute;
        width: 1rem;
        top: 0.625rem;
        right: 1.5rem;
        margin: 0;
    `}
`;

export default CustomMainPageImg;