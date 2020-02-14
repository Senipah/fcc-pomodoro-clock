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

const deviceDimensionProps = {
  mobileS: {
    sidebarWidth: 70,
    headerHeight: 45,
    surroundWidth: 15
  },
  mobileM: {
    sidebarWidth: 70,
    headerHeight: 45,
    surroundWidth: 15
  },
  mobileL: {
    sidebarWidth: 100,
    headerHeight: 45,
    surroundWidth: 15
  },
  tablet: {
    sidebarWidth: 150,
    headerHeight: 90,
    surroundWidth: 25
  },
  laptop: {
    sidebarWidth: 150,
    headerHeight: 90,
    surroundWidth: 25
  },
  laptopL: {
    sidebarWidth: 300,
    headerHeight: 90,
    surroundWidth: 25
  },
  desktop: {
    sidebarWidth: 300,
    headerHeight: 90,
    surroundWidth: 25
  }
};

const toPx = val => val.toString() + 'px';

const LcarsWrapperStyle = styled.div`
  min-height: 0;
  max-height: 100%;
  box-sizing: border-box;
  padding: 2px;
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  font-family: 'Helvetica-Compressed_22459', Arial, Helvetica, sans-serif;
  background-color: ${props => props.bg || 'black'};
  color: white;

  &:first-child {
    /* flex-grow: 0; */
  }

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
  grid-template-columns: 25px 1fr auto 25px;
  align-items: center;
  max-height: 60px;
  @media ${devices.laptop} {
    grid-template-columns: 45px 1fr auto 45px;
    margin: 0.5rem 0;
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
  height: ${toPx(deviceDimensionProps.mobileS.headerHeight * 0.33)};

  @media ${devices.mobileM} {
    height: ${toPx(deviceDimensionProps.mobileM.headerHeight * 0.33)};
  }
  @media ${devices.mobileL} {
    height: ${toPx(deviceDimensionProps.mobileL.headerHeight * 0.33)};
  }
  @media ${devices.tablet} {
    height: ${toPx(deviceDimensionProps.tablet.headerHeight * 0.33)};
  }
  @media ${devices.laptop} {
    height: ${toPx(deviceDimensionProps.laptop.headerHeight * 0.33)};
  }
  @media ${devices.laptopL} {
    height: ${toPx(deviceDimensionProps.laptopL.headerHeight * 0.33)};
  }

  @media ${devices.desktop} {
    height: ${toPx(deviceDimensionProps.desktop.headerHeight * 0.33)};
  }
`;

const LcarsContainerStyle = styled.div`
  display: grid;
  min-width: 0;
  min-height: 0;
  max-height: 100%;
  grid-template-rows: ${toPx(deviceDimensionProps.mobileS.headerHeight)} 1fr ${toPx(
      deviceDimensionProps.mobileS.headerHeight
    )};
  margin: 2px 0;

  @media ${devices.mobileM} {
    grid-template-rows: ${toPx(deviceDimensionProps.mobileM.headerHeight)} 1fr ${toPx(
        deviceDimensionProps.mobileM.headerHeight
      )};
  }
  @media ${devices.mobileL} {
    grid-template-rows: ${toPx(deviceDimensionProps.mobileL.headerHeight)} 1fr ${toPx(
        deviceDimensionProps.mobileL.headerHeight
      )};
  }
  @media ${devices.tablet} {
    grid-template-rows: ${toPx(deviceDimensionProps.tablet.headerHeight)} 1fr ${toPx(
        deviceDimensionProps.tablet.headerHeight
      )};
  }
  @media ${devices.laptop} {
    grid-template-rows: ${toPx(deviceDimensionProps.laptop.headerHeight)} 1fr ${toPx(
        deviceDimensionProps.laptop.headerHeight
      )};
  }
  @media ${devices.laptopL} {
    grid-template-rows: ${toPx(deviceDimensionProps.laptopL.headerHeight)} 1fr ${toPx(
        deviceDimensionProps.laptopL.headerHeight
      )};
  }

  @media ${devices.desktop} {
    grid-template-rows: ${toPx(deviceDimensionProps.desktop.headerHeight)} 1fr ${toPx(
        deviceDimensionProps.desktop.headerHeight
      )};
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
  grid-template-columns: ${toPx(deviceDimensionProps.mobileS.sidebarWidth)} 1fr;
  margin-top: 5px;
  flex: 0;

  @media ${devices.mobileM} {
    grid-template-columns: ${toPx(deviceDimensionProps.mobileM.sidebarWidth)} 1fr;
  }
  @media ${devices.mobileL} {
    grid-template-columns: ${toPx(deviceDimensionProps.mobileL.sidebarWidth)} 1fr;
  }
  @media ${devices.tablet} {
    grid-template-columns: ${toPx(deviceDimensionProps.tablet.sidebarWidth)} 1fr;
  }
  @media ${devices.laptop} {
    grid-template-columns: ${toPx(deviceDimensionProps.laptop.sidebarWidth)} 1fr;
  }
  @media ${devices.laptopL} {
    grid-template-columns: ${toPx(deviceDimensionProps.laptopL.sidebarWidth)} 1fr;
  }

  @media ${devices.desktop} {
    grid-template-columns: ${toPx(deviceDimensionProps.desktop.sidebarWidth)} 1fr;
  }

  &:last-child {
    flex: 1;
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
              {props.children}
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
  height: ${toPx(deviceDimensionProps.mobileS.headerHeight * 0.33)};

  @media ${devices.mobileM} {
    height: ${toPx(deviceDimensionProps.mobileM.headerHeight * 0.33)};
  }
  @media ${devices.mobileL} {
    height: ${toPx(deviceDimensionProps.mobileL.headerHeight * 0.33)};
  }
  @media ${devices.tablet} {
    height: ${toPx(deviceDimensionProps.tablet.headerHeight * 0.33)};
  }
  @media ${devices.laptop} {
    height: ${toPx(deviceDimensionProps.laptop.headerHeight * 0.33)};
  }
  @media ${devices.laptopL} {
    height: ${toPx(deviceDimensionProps.laptopL.headerHeight * 0.33)};
  }

  @media ${devices.desktop} {
    height: ${toPx(deviceDimensionProps.desktop.headerHeight * 0.33)};
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
  height: ${toPx(deviceDimensionProps.mobileS.headerHeight * 0.33)};

  @media ${devices.mobileM} {
    height: ${toPx(deviceDimensionProps.mobileM.headerHeight * 0.33)};
  }
  @media ${devices.mobileL} {
    height: ${toPx(deviceDimensionProps.mobileL.headerHeight * 0.33)};
  }
  @media ${devices.tablet} {
    height: ${toPx(deviceDimensionProps.tablet.headerHeight * 0.33)};
  }
  @media ${devices.laptop} {
    height: ${toPx(deviceDimensionProps.laptop.headerHeight * 0.33)};
  }
  @media ${devices.laptopL} {
    height: ${toPx(deviceDimensionProps.laptopL.headerHeight * 0.33)};
  }

  @media ${devices.desktop} {
    height: ${toPx(deviceDimensionProps.desktop.headerHeight * 0.33)};
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
  padding: 0.25rem;
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
  grid-template-columns: ${toPx(deviceDimensionProps.mobileS.sidebarWidth * 2)} 1fr auto 45px;

  @media ${devices.mobileM} {
    grid-template-columns: ${toPx(
        deviceDimensionProps.mobileM.sidebarWidth * 2
      )} 1fr auto 45px;
  }
  @media ${devices.mobileL} {
    grid-template-columns: ${toPx(
        deviceDimensionProps.mobileL.sidebarWidth * 2
      )} 1fr auto 45px;
  }
  @media ${devices.tablet} {
    grid-template-columns: ${toPx(deviceDimensionProps.tablet.sidebarWidth * 2)} 1fr auto 45px;
  }
  @media ${devices.laptop} {
    grid-template-columns: ${toPx(deviceDimensionProps.laptop.sidebarWidth * 2)} 1fr auto 45px;
  }
  @media ${devices.laptopL} {
    grid-template-columns: ${toPx(
        deviceDimensionProps.laptopL.sidebarWidth * 2
      )} 1fr auto 45px;
  }

  @media ${devices.desktop} {
    grid-template-columns: ${toPx(
        deviceDimensionProps.desktop.sidebarWidth * 2
      )} 1fr auto 45px;
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
  line-height: ${toPx(deviceDimensionProps.mobileS.headerHeight * 0.33)};

  @media ${devices.mobileM} {
    line-height: ${toPx(deviceDimensionProps.mobileM.headerHeight * 0.33)};
  }
  @media ${devices.mobileL} {
    line-height: ${toPx(deviceDimensionProps.mobileL.headerHeight * 0.33)};
  }
  @media ${devices.tablet} {
    line-height: ${toPx(deviceDimensionProps.tablet.headerHeight * 0.33)};
  }
  @media ${devices.laptop} {
    line-height: ${toPx(deviceDimensionProps.laptop.headerHeight * 0.33)};
  }
  @media ${devices.laptopL} {
    line-height: ${toPx(deviceDimensionProps.laptopL.headerHeight * 0.33)};
  }

  @media ${devices.desktop} {
    line-height: ${toPx(deviceDimensionProps.desktop.headerHeight * 0.33)};
  }
`;

const LcarsContainerFooterStyle = styled.div`
  display: grid;
  grid-template-columns:
    ${toPx(deviceDimensionProps.mobileS.sidebarWidth * 2)} minmax(0, 1fr)
    45px;
  align-items: flex-end;

  @media ${devices.mobileM} {
    grid-template-columns:
      ${toPx(deviceDimensionProps.mobileM.sidebarWidth * 2)} minmax(0, 1fr)
      45px;
  }
  @media ${devices.mobileL} {
    grid-template-columns:
      ${toPx(deviceDimensionProps.mobileL.sidebarWidth * 2)} minmax(0, 1fr)
      45px;
  }
  @media ${devices.tablet} {
    grid-template-columns:
      ${toPx(deviceDimensionProps.tablet.sidebarWidth * 2)} minmax(0, 1fr)
      45px;
  }
  @media ${devices.laptop} {
    grid-template-columns:
      ${toPx(deviceDimensionProps.laptop.sidebarWidth * 2)} minmax(0, 1fr)
      45px;
  }
  @media ${devices.laptopL} {
    grid-template-columns:
      ${toPx(deviceDimensionProps.laptopL.sidebarWidth * 2)} minmax(0, 1fr)
      45px;
  }

  @media ${devices.desktop} {
    grid-template-columns:
      ${toPx(deviceDimensionProps.desktop.sidebarWidth * 2)} minmax(0, 1fr)
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
  /* align-self: stretch;
  justify-self: center; */
  background-color: ${props => props.themeColor || defaultThemeColor};
  color: 'black';
  border: none;
  border-radius: 60px;
  margin: 0.25rem;
  padding: 0.25rem 0.5rem;
  font-family: inherit;
  font-size: 1rem;
  border: 1px solid transparent;
  max-width: 100px;
  justify-self: center;
  &:hover {
    background-color: transparent;
    color: ${props => props.themeColor || defaultThemeColor};
    border: 1px solid ${props => props.themeColor || defaultThemeColor};
  }
  &:active {
    transform: translate(1px);
  }

  @media ${devices.laptop} {
    /* padding: 0.5rem 1rem; */
  }
`;

export const ButtonLeft = styled(Button)`
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  margin-right: 1px;
  align-self: center;
  justify-self: stretch;
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
  align-self: center;
  justify-self: stretch;
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
  grid-template-columns: 15px auto 15px;
  grid-template-rows: minmax(0, 1fr);
  align-items: center;
  justify-content: center;

  @media ${devices.mobileM} {
  }
  @media ${devices.mobileL} {
  }
  @media ${devices.tablet} {
  }
  @media ${devices.laptop} {
  }
  @media ${devices.laptopL} {
  }

  @media ${devices.desktop} {
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

export const FlexDiv = styled.div`
  display: flex;
  flex-direction: ${props => props.flexDirection};
  padding: 0.25rem 0.5rem;
  min-height: 0;
  max-height: 100%;
  max-width: 100%;
  justify-content: ${props => props.justifyContent};
  align-items: ${props => props.alignItems};
`;

FlexDiv.defaultProps = {
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
};

export const ResponsiveFlexDiv = styled(FlexDiv)`
  flex-direction: ${props => props.smlFlexDirection};
  justify-content: ${props => props.smlJustifyContent};
  align-items: ${props => props.smlAlignItems};
  /* width: auto;
  height: auto; */
  @media ${devices.laptop} {
    flex-direction: ${props => props.lrgFlexDirection};
    justify-content: ${props => props.lrgJustifyContent};
    align-items: ${props => props.lrgAlignItems};
  }
`;

ResponsiveFlexDiv.defaultProps = {
  smlFlexDirection: 'column',
  smlJustifyContent: 'center',
  smlAlignItems: 'center',
  lrgFlexDirection: 'row',
  lrgJustifyContent: 'center',
  lrgAlignItems: 'center'
};

export const Screen = styled(FlexDiv)`
  padding: 5px 10px;
  font-size: 2rem;
  min-width: 60px;
  /* justify-content: ; */
  border: 1px dashed #333;
  text-align: center;
  color: ${themeColors.modern};
  flex-direction: row;
  background-color: #111;
  justify-self: center;
  align-self: center;
  max-width: max-content;
  @media ${devices.laptop} {
    font-size: 1rem;
  }
`;

export const MainScreen = styled(Screen)`
  padding: 0.5rem 1rem;
  font-size: 3rem;
  max-height: min-content;

  @media ${devices.laptop} {
    font-size: 3rem;
  }
`;
