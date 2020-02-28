import React from 'react';
import styled from 'styled-components';

const StyledSvg = styled.svg`
  width: 100%;
  height: 0;
  min-height: 100%;
  fill: ${props => props.theme.themeColor || 'gray'};
`;

const SvgContainer = styled.div`
  min-height: 0;
  max-height: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ElbowLeftBottom = props => {
  return (
    <SvgContainer>
      <StyledSvg
        data-name='Layer 1'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 300 90'
        preserveAspectRatio='none'
      >
        <path d='M150 90H75C33.58 90 0 56.61 0 15.41V0h150v22.87A37.26 37.26 0 0 0 187.5 60H300v30z' />
      </StyledSvg>
    </SvgContainer>
  );
};

export const ElbowLeftTop = props => {
  return (
    <SvgContainer>
      <StyledSvg
        data-name='Layer 1'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 300 90'
        preserveAspectRatio='none'
      >
        <path d='M150 0H75C33.58 0 0 33.39 0 74.59V90h150V67.13A37.26 37.26 0 0 1 187.5 30H300V0z' />
      </StyledSvg>
    </SvgContainer>
  );
};

const SurroundSVG = styled(StyledSvg)`
  min-height: 80%;
  align-self: center;
  justify-self: center;
`;

export const SurroundLeft = props => {
  return (
    <SvgContainer>
      <SurroundSVG
        viewBox='0 0 3.904897 29.412678'
        xmlns='http://www.w3.org/2000/svg'
        preserveAspectRatio='none'
      >
        <path d='M 0,25.550255 V 3.8624222 H 2.01753 V 25.550255 H 0 m 2.850575,3.862422 H 2.551199 C 1.142257,29.412677 0,27.979719 0,26.211588 v -0.661333 h 2.01753 v 0.981485 c 0.0024,0.884983 0.574154,1.599169 1.2756,1.593463 h 0.611767 v 1.287474 z M 2.850575,0 H 2.5512 C 1.142257,0 0,1.4329586 0,3.2010897 V 3.8624222 H 2.01753 V 2.8809378 C 2.01993,1.9959549 2.591684,1.2817684 3.29313,1.2874741 H 3.904897 V 0 Z' />
      </SurroundSVG>
    </SvgContainer>
  );
};

export const SurroundRight = props => {
  return (
    <SvgContainer>
      <SurroundSVG
        viewBox='0 0 3.904897 29.412678'
        xmlns='http://www.w3.org/2000/svg'
        preserveAspectRatio='none'
      >
        <path
          d='M 3.904897,25.550255 V 3.8624222 H 1.887367 V 25.550255 h 2.01753 m -2.850575,3.862422 h 0.299376 c 1.408942,0 2.551199,-1.432958 2.551199,-3.201089 v -0.661333 h -2.01753 v 0.981485 c -0.0024,0.884983 -0.574154,1.599169 -1.2756,1.593463 H 0 v 1.287474 z M 1.054322,0 h 0.299375 c 1.408943,0 2.5512,1.4329586 2.5512,3.2010897 V 3.8624222 H 1.887367 V 2.8809378 C 1.884967,1.9959549 1.313213,1.2817684 0.611767,1.2874741 H 0 V 0 Z'
          // fill={getFill(props.fill)}
        />
      </SurroundSVG>
    </SvgContainer>
  );
};
