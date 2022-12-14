import styled, { ThemeProvider } from "styled-components";
import Container from "./container";
import Header from "../header";
import { useSelector } from "react-redux";
import { modeSelector } from "../../store/reducers/settingSlice";
import light from "../../styles/theme/light";
import Background from "../background";
import Footer from "../footer";
import dark from "../../styles/theme/dark";
import Tip from "../tooltip/tip";
import { tooltipContentSelector } from "../../store/reducers/tooltipSlice";
import ScrollToTop from "../scrollToTop";

const Main = styled.main`
  flex-grow: 1;
  margin-top: 20px;
  z-index: 1;
`;

export default function Layout({ children }) {
  const mode = useSelector(modeSelector);
  const theme = mode === "light" ? light : dark;
  const tooltipContent = useSelector(tooltipContentSelector);

  return (
    <ThemeProvider theme={theme}>
      <Background />

      <Container>
        <Header />

        <Main>{children}</Main>

        <Footer />

        <Tip>{tooltipContent}</Tip>
      </Container>

      <ScrollToTop />
    </ThemeProvider>
  );
}
