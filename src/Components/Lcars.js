import React from 'react';
import {
  ElbowLeftBottom,
  ElbowLeftTop,
  EndcapLeft,
  EndcapRight
} from './LcarsSvg';
import styled, { createGlobalStyle } from 'styled-components';
import HelveticaCompressed from '../assets/fonts/Helvetica-Compressed_22459.ttf';

export const themeColors = {
  modern: '#00e7ff',
  lcars1: '#FF9900',
  lcars2: '#CC99CC',
  lcars3: '#9999CC',
  lcars4: '#CC6666',
  lcars5: '#FFCC99',
  lcars6: '#9999FF',
  lcars7: '#FF9966',
  lcars8: '#CC6699'
};

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'Helvetica-Compressed_22459';
  src: url(${HelveticaCompressed}) format('truetype');
}
  
`;

const defaultThemeColor = themeColors.modern;

const getTheme = props => {
  return { themeColor: props.color || defaultThemeColor };
};

export const LcarsWrapper = props => {
  const Lcars = styled.div`
    box-sizing: border-box;
    padding: 8px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    text-transform: uppercase;
    font-family: 'Helvetica-Compressed_22459', Arial, Helvetica, sans-serif;
    background-color: black;
    color: white;
  `;
  return (
    <Lcars>
      <GlobalStyle />
      {props.children}
    </Lcars>
  );
};

export const LcarsHeader = props => {
  const theme = getTheme(props);
  const Style = styled.header`
    padding: 1rem 2rem;
    display: grid;
    grid-template-columns: 45px minmax(200px, 1fr) auto 45px;
    grid-template-rows: 30px;
    align-items: center;
  `;
  return (
    <Style>
      <EndcapLeft fill={theme.themeColor} />
      <LcarsHorizontalBar theme={theme} />
      <LcarsHeaderContent>
        <h1 style={{ color: theme.themeColor }}>{props.title}</h1>
      </LcarsHeaderContent>
      <EndcapRight fill={theme.themeColor} />
    </Style>
  );
};

const LcarsHeaderContent = styled.div`
  margin: 0 5px;
  display: flex;
`;

export const LcarsContainer = props => {
  const theme = getTheme(props);
  const Style = styled.div`
    padding: 1rem 2rem;
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: 90px 1fr 90px;
  `;
  return (
    <Style>
      <LcarsContainerHeader title={props.title} theme={theme} />
      <LcarsContainerMain>{props.children}</LcarsContainerMain>
      <LcarsContainerFooter theme={theme} />
    </Style>
  );
};

const LcarsContainerMain = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LcarsContainerSection = props => {
  const theme = getTheme(props);
  const Style = styled.section`
    display: grid;
    grid-template-columns: 150px 1fr;
    margin-top: 5px;
    &:last-child {
      flex-grow: 2;
      margin-bottom: 5px;
    }
  `;
  return (
    <Style id={props.id}>
      <LcarsSectionSidebar
        theme={theme}
        title={props.title}
        id={`${props.name}-label`}
      />
      <LcarsSectionBody>{props.children}</LcarsSectionBody>
    </Style>
  );
};

const LcarsHorizontalBar = styled.div`
  height: 30px;
  background-color: ${props => props.theme.themeColor};
`;

const LcarsSectionSidebar = props => {
  const Style = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    text-align: right;
    color: black;
    padding: 0.5rem;
    background-color: ${props.theme.themeColor};
  `;
  return (
    <Style id={props.id}>
      <h3>{props.title}</h3>
    </Style>
  );
};

const LcarsSectionBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LcarsContainerHeader = props => {
  const Style = styled.div`
    display: grid;
    grid-template-columns: 300px minmax(200px, 1fr) auto 45px;
  `;
  return (
    <Style>
      <ElbowLeftTop fill={props.theme.themeColor} />
      <LcarsHorizontalBar theme={props.theme} />
      <LcarsHeaderContent>
        <h2 style={{ color: props.theme.themeColor }}>{props.title}</h2>
      </LcarsHeaderContent>
      <EndcapRight fill={props.theme.themeColor} />
    </Style>
  );
};

const LcarsContainerFooter = props => {
  const Style = styled.div`
    display: grid;
    grid-template-columns: 300px minmax(200px, 1fr) 45px;
    align-items: flex-end;
  `;

  return (
    <Style>
      <ElbowLeftBottom fill={props.theme.themeColor} />
      <LcarsHorizontalBar theme={props.theme} />
      <EndcapRight fill={props.theme.themeColor} />
    </Style>
  );
};

export const Button = styled.button`
  min-width: 50px;
  background-color: ${props => props.color || defaultThemeColor};
  color: 'black';
  border: none;
  border-radius: 16px;
  margin: 0.5em;
  padding: 0.5em 1em;
  font-family: inherit;
  border: 1px solid transparent;
  &:hover {
    background-color: transparent;
    color: ${props => props.color || defaultThemeColor};
    border: 1px solid ${props => props.color || defaultThemeColor};
  }
  &:active {
    transform: translate(1px);
  }
`;

export const ButtonLeft = styled(Button)`
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  margin-right: 1px;
  background-color: ${props => props.color || themeColors.lcars7};
  &:hover {
    color: ${props => props.color || themeColors.lcars7};
    border: 1px solid ${props => props.color || themeColors.lcars7};
  }

  &:active {
    transform: translateX(1px);
  }
`;

export const ButtonRight = styled(Button)`
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  margin-left: 1px;
  background-color: ${props => props.color || themeColors.lcars4};
  &:hover {
    color: ${props => props.color || themeColors.lcars4};
    border: 1px solid ${props => props.color || themeColors.lcars4};
  }
  &:active {
    transform: translateX(-1px);
  }
`;
