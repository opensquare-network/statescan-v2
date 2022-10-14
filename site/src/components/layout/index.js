import styled, { ThemeProvider } from "styled-components";
import Container from "./container";
import Header from "../header";
import { useDispatch, useSelector } from "react-redux";
import { modeSelector } from "../../store/reducers/settingSlice";
import light from "../../styles/theme/light";
import Background from "../dotBackground";
import Footer from "../footer";
import dark from "../../styles/theme/dark";
import { closeMobileMenu } from "../../store/reducers/mobileMenuSlice";
import { useWindowSize } from "../../utils/hooks";
import { useEffect } from "react";
import Tip from "../tooltip/tip";
import { tooltipContentSelector } from "../../store/reducers/tooltipSlice";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${(p) => p.theme.fillPanel};
`;

const Main = styled.main`
  flex-grow: 1;
  margin-top: 24px;
  z-index: 1;
`;

export default function Layout({ children }) {
  const mode = useSelector(modeSelector);
  const theme = mode === "light" ? light : dark;
  const tooltipContent = useSelector(tooltipContentSelector);
  const dispatch = useDispatch();

  const { width } = useWindowSize();

  useEffect(() => {
    if (width > 600) {
      dispatch(closeMobileMenu());
    }
  }, [dispatch, width]);

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
        <Footer />
        <Tip>{tooltipContent}</Tip>
      </Wrapper>
    </ThemeProvider>
  );
}
