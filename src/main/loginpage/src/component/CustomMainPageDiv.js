import styled, {css} from "styled-components";

const CustomMainPageDiv = styled.div`
    display: flex;

    ${props => props.$year && css`        
        padding: 0.5rem;
        justify-content: center;
        flex-shrink: 0;
        color: #3E54AC;
        font-family: Noto Sans;
        font-size: 1.875rem;
        font-style: normal;
        font-weight: 700;
        line-height: 1rem; /* 53.333% */
    `}

    ${props => props.$month && css`    
        padding: 0.5rem;
        justify-content: center;
        flex-shrink: 0;
        color: #8DCBE6;
        text-align: center;
        font-family: Noto Sans;
        font-size: 1.875rem;
        font-style: normal;
        font-weight: 700;
        line-height: 1rem; /* 53.333% */
    `}
    
    ${props => props.$t1 && css`
        color: var(--yoda-admin-template-blacks-b-100, #2D3436);
        font-family: Noto Sans;
        font-size: 1rem;
        font-style: normal;
        font-weight: 200;
        line-height: 1.3125rem; /* 131.25% */
        letter-spacing: 0.03rem;
        align-items: center;
        text-align: center;
        gap: 0.625rem;
        flex: 1 0 0;
        width: 100%;
        height: 5.125rem;
        padding: 0.5rem 1rem;

    `}
    
    ${props => props.$t2 && css`
        color: #3E54AC;
        font-family: Noto Sans;
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 600;
        line-height: 0.75rem; /* 85.714% */
        justify-items: center;
        justify-content: center;
        align-items: center;
        gap: 0.625rem;
        flex: 1 0 0;
        width:100%;
        height: 5.125rem;
        padding: 0.5rem 1rem;
    `}
`;

export default CustomMainPageDiv;