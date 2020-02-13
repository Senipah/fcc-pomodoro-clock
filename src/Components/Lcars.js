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
import { devices } from '../mediaQueries';

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

const sidebarWidths = {
  sml: 70,
  med: 150,
  lrg: 300
};

const headerHeights = {
  sml: 45,
  med: 90
};

const toPx = val => val.toString() + 'px';

const LcarsWrapperStyle = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 2px;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  font-family: 'Helvetica-Compressed_22459', Arial, Helvetica, sans-serif;
  background-color: ${props => props.bg || 'black'};
  color: white;

  @media ${devices.laptop} {
    max-width: 1000px;
    padding: 0.5rem 1rem;
  }

  @media ${devices.desktop} {
    max-width: 2000px;
    padding: 1rem 2rem;
  }
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
  display: grid;
  /* margin: 1px 0; */
  grid-template-columns: 25px 1fr auto 25px;
  align-items: center;

  @media ${devices.laptop} {
    grid-template-columns: 45px 1fr auto 45px;
    margin: 1rem 0;
  }
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
`;

const LcarsResponsiveHeaderContent = styled(LcarsHeaderContent)`
  height: ${toPx(headerHeights.sml * 0.33)};
`;

const LcarsContainerStyle = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 45px 1fr 45px;
  margin: 2px 0;

  @media ${devices.laptop} {
    grid-template-rows: 45px 1fr 45px;
    margin: 1rem 0;
  }
`;

export const LcarsContainer = props => {
  const theme = {
    themeColor: props.themeColor || defaultThemeColor
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
  grid-template-columns: ${toPx(sidebarWidths.sml)} 1fr;
  margin-top: 5px;

  @media ${devices.laptop} {
    grid-template-columns: ${toPx(sidebarWidths.med)} 1fr;
  }

  &:last-child {
    flex-grow: 1;
    margin-bottom: 5px;
  }
`;

export const LcarsContainerSection = props => {
  return (
    <ThemeConsumer>
      {parentTheme => {
        const theme = {
          ...parentTheme,
          themeColor: props.themeColor || parentTheme.themeColor
        };
        return (
          <ThemeProvider theme={theme}>
            <LcarsContainerSectionStyle id={props.id}>
              <LcarsSectionSidebar
                title={props.title}
                id={`${props.id}-label`}
                themeColor={props.themeColor}
              />
              <FlexDiv>{props.children}</FlexDiv>
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

const LcarsResponsiveHorizontalBar = styled(LcarsHorizontalBar)`
  height: ${toPx(headerHeights.sml * 0.33)};
  @media ${devices.laptop} {
    height: ${toPx(headerHeights.med * 0.33)};
  }
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

const LcarsResponsiveEndcapRight = styled(LcarsEndcapRight)`
  height: ${toPx(headerHeights.sml * 0.33)};
  @media ${devices.laptop} {
    height: ${toPx(headerHeights.med * 0.33)};
  }
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

const LcarsContainerHeaderStyle = styled.div`
  display: grid;
  grid-template-columns: ${toPx(sidebarWidths.sml * 2)} 1fr auto 45px;

  @media ${devices.laptop} {
    grid-template-columns: ${toPx(sidebarWidths.med * 2)} 1fr auto 45px;
  }
`;

const LcarsContainerHeader = props => {
  return (
    <LcarsContainerHeaderStyle>
      <ThemeConsumer>
        {theme => <ElbowLeftTop fill={theme.themeColor} />}
      </ThemeConsumer>
      <LcarsResponsiveHorizontalBar />
      <LcarsResponsiveHeaderContent>
        <H2>{props.title}</H2>
      </LcarsResponsiveHeaderContent>
      <LcarsResponsiveEndcapRight />
    </LcarsContainerHeaderStyle>
  );
};

const H2 = styled.h2`
  color: ${props => props.theme.themeColor};
  white-space: nowrap;
  overflow: ellipsis;
  line-height: ${toPx(headerHeights.sml * 0.33)};
`;

const LcarsContainerFooterStyle = styled.div`
  display: grid;
  grid-template-columns:
    ${toPx(sidebarWidths.sml * 2)} minmax(0, 1fr)
    45px;
  align-items: flex-end;

  @media ${devices.laptop} {
    grid-template-columns:
      ${toPx(sidebarWidths.med * 2)} minmax(0, 1fr)
      45px;
  }
`;

const LcarsContainerFooter = props => {
  return (
    <LcarsContainerFooterStyle>
      <ThemeConsumer>
        {theme => <ElbowLeftBottom fill={theme.themeColor} />}
      </ThemeConsumer>
      <LcarsResponsiveHorizontalBar />
      <LcarsResponsiveEndcapRight />
    </LcarsContainerFooterStyle>
  );
};

export const Button = styled.button`
  min-width: 50px;
  background-color: ${props => props.themeColor || defaultThemeColor};
  color: 'black';
  border: none;
  border-radius: 60px;
  margin: 0.25rem;
  padding: 0.25rem 0.5rem;
  font-family: inherit;
  font-size: 1rem;
  border: 1px solid transparent;
  &:hover {
    background-color: transparent;
    color: ${props => props.themeColor || defaultThemeColor};
    border: 1px solid ${props => props.themeColor || defaultThemeColor};
  }
  &:active {
    transform: translate(1px);
  }

  @media ${devices.laptop} {
    padding: 0.5rem 1rem;
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
  padding: 0.25rem;
  display: grid;
  column-gap: 1rem;
  grid-template-columns: 15px 1fr 15px;
  grid-template-rows: minmax(0, 1fr);
  width: auto;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  align-items: center;
  justify-content: center;

  @media ${devices.laptop} {
    padding: 1rem;
    grid-template-columns: 25px 1fr 25px;
  }
`;

export const Surround = props => {
  const theme = {
    themeColor: props.themeColor || defaultThemeColor
  };
  return (
    <ThemeProvider theme={theme}>
      <SurroundStyle>
        <SurroundLeft />
        <FlexDiv>{props.children}</FlexDiv>
        <SurroundRight />
      </SurroundStyle>
    </ThemeProvider>
  );
};

const FlexDivStyle = styled.div`
  display: flex;
  flex-direction: ${props => props.direction || 'column'};
  justify-content: center;
  align-items: space-evenly;
  width: min-content;
  height: min-content;
  justify-self: center;
`;

const ResponsiveFlexDivStyle = styled(FlexDivStyle)`
  flex-direction: column;
  width: auto;
  height: auto;
  @media ${devices.laptop} {
    flex-direction: row;
  }
`;

export const FlexDiv = props => {
  const directionValues = [
    'column',
    'column-reverse',
    'inherit',
    'initial',
    'row',
    'row-reverse',
    'unset'
  ];
  return directionValues.includes(props.direction) ? (
    <FlexDivStyle direction={props.direction}>{props.children}</FlexDivStyle>
  ) : (
    <ResponsiveFlexDivStyle>{props.children}</ResponsiveFlexDivStyle>
  );
};

export const Screen = styled(ResponsiveFlexDivStyle)`
  margin: 0.25rem;
  padding: 0.25rem 0.5rem;
  font-size: 1.25rem;
  min-width: 60px;
  width: auto;
  border: 1px dashed #333;
  text-align: center;
  color: ${themeColors.modern};
  flex-direction: row;
  align-self: center;
  background-color: #111;
  @media ${devices.laptop} {
    font-size: 2.5rem;
  }
`;

export const MainScreen = styled(Screen)`
  padding: 0.5rem 1rem;
  font-size: 2rem;
  width: 100%;

  @media ${devices.laptop} {
    font-size: 4.5rem;
  }
`;
