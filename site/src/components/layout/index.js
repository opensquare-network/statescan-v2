import styled, { css, ThemeProvider } from "styled-components";
import Container from "./container";
import Header from "../header";
import { useDispatch, useSelector } from "react-redux";
import { modeSelector } from "../../store/reducers/modeSlice";
import light from "../../styles/theme/light";
import Background from "../dotBackground";
import Footer from "../footer";
import dark from "../../styles/theme/dark";
import ChainSwitch from "../header/chainSwitch";
import {
  closeMobileMenu,
  mobileMenuFoldedSelector,
} from "../../store/reducers/mobileMenuSlice";
import Navi from "../header/navi";
import { useWindowSize } from "../../utils/hooks";
import { useEffect } from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: ${(props) => props.theme.fillPanel};
`;

const Main = styled.main`
  flex-grow: 1;
  margin-top: 24px;
  z-index: 1;
`;

const MobileMenuWrapper = styled.div`
  background: ${(props) => props.theme.fillPanel};
  padding: 0 24px;
  @media screen and (max-width: 600px) {
    padding: 0 16px;
  }
  box-sizing: border-box;
  position: fixed !important;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: scroll;
  z-index: 2;
`;

export default function Layout({ children }) {
  const mode = useSelector(modeSelector);
  const theme = mode === "light" ? light : dark;
  const showMobileMenu = !useSelector(mobileMenuFoldedSelector);
  const dispatch = useDispatch();

  const { width } = useWindowSize();

  useEffect(() => {
    if (width > 600) {
      dispatch(closeMobileMenu());
    }
  }, [width]);

  return (
    <ThemeProvider theme={theme}>
      <Background />
      <Wrapper>
        <Container style={{ zIndex: 2 }}>
          <Header />
        </Container>
        <Main>
          <Container>{children}</Container>
        </Main>
        {showMobileMenu && (
          <MobileMenuWrapper>
            <Header />
            <ChainSwitch />
            <Navi />
          </MobileMenuWrapper>
        )}
        <Footer />
      </Wrapper>
    </ThemeProvider>
  );
}
