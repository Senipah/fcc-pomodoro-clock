import React from 'react';
import {
  ElbowLeftBottom,
  ElbowLeftTop,
  SurroundLeft,
  SurroundRight
} from './LcarsSvg';
import styled, {
  createGlobalStyle,
  ThemeProvider,
  ThemeConsumer
} from 'styled-components';
import HelveticaCompressed from '../assets/fonts/Helvetica-Compressed_22459.ttf';

export const themeColors = {
  modern: '#00e7ff',
  alert: '#e41400',
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

const LcarsWrapperStyle = styled.div`
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

export const LcarsWrapper = props => {
  return (
    <LcarsWrapperStyle>
      <GlobalStyle />
      {props.children}
    </LcarsWrapperStyle>
  );
};

const HeaderStyle = styled.header`
  padding: 1rem 2rem;
  display: grid;
  grid-template-columns: 45px 1fr auto 45px;
  grid-template-rows: 30px;
  align-items: center;
`;

export const LcarsHeader = props => {
  const theme = { themeColor: props.themeColor || defaultThemeColor };
  return (
    <ThemeProvider theme={theme}>
      <HeaderStyle>
        <LcarsEndcapLeft />
        <LcarsHorizontalBar />
        <LcarsHeaderContent>
          <H1>{props.title}</H1>
        </LcarsHeaderContent>
        <LcarsEndcapRight />
      </HeaderStyle>
    </ThemeProvider>
  );
};

const H1 = styled.h1`
  color: ${props => props.theme.themeColor};
  white-space: nowrap;
  overflow: ellipsis;
`;

const LcarsHeaderContent = styled.div`
  margin: 0 5px;
  display: inline-block;
`;

const LcarsContainerStyle = styled.div`
  padding: 1rem 2rem;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 90px 1fr 90px;
`;

export const LcarsContainer = props => {
  const theme = {
    themeColor: props.themeColor || defaultThemeColor,
    sidebarWidth: props.sidebarWidth || 300
  };
  return (
    <ThemeProvider theme={theme}>
      <LcarsContainerStyle>
        <LcarsContainerHeader title={props.title} />
        <LcarsContainerMain>{props.children}</LcarsContainerMain>
        <LcarsContainerFooter />
      </LcarsContainerStyle>
    </ThemeProvider>
  );
};

const LcarsContainerMain = styled.div`
  display: flex;
  flex-direction: column;
`;

const LcarsContainerSectionStyle = styled.section`
  display: grid;
  grid-template-columns: ${props => props.theme.sidebarWidth.toString() + 'px'} 1fr;
  margin-top: 5px;
  &:last-child {
    flex-grow: 1;
    margin-bottom: 5px;
  }
`;

export const LcarsContainerSection = props => {
  // console.log(props.theme.sidebarWidth);

  return (
    <ThemeConsumer>
      {parentTheme => {
        const theme = {
          ...parentTheme,
          sidebarWidth: parentTheme.sidebarWidth / 2,
          themeColor: props.themeColor || parentTheme.themeColor
        };
        return (
          <ThemeProvider theme={theme}>
            <LcarsContainerSectionStyle
              id={props.id}
              sidebarWidth={props.sidebarWidth}
            >
              <LcarsSectionSidebar
                title={props.title}
                id={`${props.id}-label`}
                themeColor={props.themeColor}
              />
              <LcarsSectionBody>{props.children}</LcarsSectionBody>
            </LcarsContainerSectionStyle>
          </ThemeProvider>
        );
      }}
    </ThemeConsumer>
  );
};

const LcarsHorizontalBar = styled.div`
  height: 30px;
  background-color: ${props => props.theme.themeColor};
`;

const LcarsPill = styled.div`
  height: 30px;
  background-color: ${props => props.theme.themeColor};
  border-radius: 60px;
`;

const LcarsEndcapRight = styled(LcarsPill)`
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
`;

const LcarsEndcapLeft = styled(LcarsPill)`
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
`;

const LcarsSectionSidebarStyle = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-align: right;
  color: black;
  padding: 0.5rem;
  background-color: ${props => props.themeColor || defaultThemeColor};
`;

const LcarsSectionSidebar = props => {
  return (
    <LcarsSectionSidebarStyle id={props.id} themeColor={props.themeColor}>
      <h3>{props.title}</h3>
    </LcarsSectionSidebarStyle>
  );
};

const LcarsSectionBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LcarsContainerHeaderStyle = styled.div`
  display: grid;
  grid-template-columns: ${props => props.theme.sidebarWidth.toString() + 'px'} 1fr auto 45px;
`;

const LcarsContainerHeader = props => {
  return (
    <LcarsContainerHeaderStyle>
      <ThemeConsumer>
        {theme => <ElbowLeftTop fill={theme.themeColor} />}
      </ThemeConsumer>
      <LcarsHorizontalBar />
      <LcarsHeaderContent>
        <H2>{props.title}</H2>
      </LcarsHeaderContent>
      <LcarsEndcapRight />
    </LcarsContainerHeaderStyle>
  );
};

const H2 = styled.h2`
  color: ${props => props.theme.themeColor};
  white-space: nowrap;
  overflow: ellipsis;
`;

const LcarsContainerFooterStyle = styled.div`
  display: grid;
  grid-template-columns:
    ${props => props.theme.sidebarWidth.toString() + 'px'} minmax(200px, 1fr)
    45px;
  align-items: flex-end;
`;

const LcarsContainerFooter = props => {
  return (
    <LcarsContainerFooterStyle>
      <ThemeConsumer>
        {theme => <ElbowLeftBottom fill={theme.themeColor} />}
      </ThemeConsumer>
      <LcarsHorizontalBar />
      <LcarsEndcapRight />
    </LcarsContainerFooterStyle>
  );
};

export const Button = styled.button`
  min-width: 50px;
  background-color: ${props => props.themeColor || defaultThemeColor};
  color: 'black';
  border: none;
  border-radius: 60px;
  margin: 0.5em;
  padding: 0.5em 1em;
  font-family: inherit;
  border: 1px solid transparent;
  &:hover {
    background-color: transparent;
    color: ${props => props.themeColor || defaultThemeColor};
    border: 1px solid ${props => props.themeColor || defaultThemeColor};
  }
  &:active {
    transform: translate(1px);
  }
`;

export const ButtonLeft = styled(Button)`
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  margin-right: 1px;
  background-color: ${props => props.themeColor || themeColors.lcars7};
  &:hover {
    color: ${props => props.themeColor || themeColors.lcars7};
    border: 1px solid ${props => props.themeColor || themeColors.lcars7};
  }

  &:active {
    transform: translateX(1px);
  }
`;

export const ButtonRight = styled(Button)`
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  margin-left: 1px;
  background-color: ${props => props.themeColor || themeColors.lcars4};
  &:hover {
    color: ${props => props.themeColor || themeColors.lcars4};
    border: 1px solid ${props => props.themeColor || themeColors.lcars4};
  }
  &:active {
    transform: translateX(-1px);
  }
`;

const SurroundStyle = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: 25px 1fr 25px;
  grid-template-rows: minmax(0, 1fr);
  width: auto;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  align-items: center;
  justify-content: center;
`;

const SurroundBody = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 1rem;
`;

export const Surround = props => {
  const theme = {
    themeColor: props.themeColor || defaultThemeColor
  };
  return (
    <ThemeProvider theme={theme}>
      <SurroundStyle>
        <SurroundLeft />
        <SurroundBody>{props.children}</SurroundBody>
        <SurroundRight />
      </SurroundStyle>
    </ThemeProvider>
  );
};
