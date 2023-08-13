import React from 'react';
import styled, { css } from 'styled-components';

const CustomMainPageH1 = styled.h1`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: 700;
  font-size: 1.5rem; 

  ${props => props.$myPage && css`
    color: #3E54AC;
    line-height: 120%; /* 150% * 0.8 */
    letter-spacing: -0.03rem; 
    flex: 0.9; 
  `}

  ${props => props.$searchPageYear && css`
    color: #3E54AC;
    line-height: 0.8rem; 
  `}
`;

export default CustomMainPageH1;
