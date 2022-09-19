import styled, { ThemeProvider } from "styled-components";
import Container from "./container";
import Header from "../header";
import { useSelector } from "react-redux";
import { modeSelector } from "../../store/reducers/modeSlice";
import light from "../../styles/theme/light";
import Background from "../dotBackground";
import Footer from "../footer";
import dark from "../../styles/theme/dark";

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

export default function Layout({ children }) {
  const mode = useSelector(modeSelector);
  const theme = mode === "light" ? light : dark;

  return (
    <ThemeProvider theme={theme}>
      <Background />
      <Wrapper>
        <Header />
        <Main>
          <Container>{children}</Container>
        </Main>
        <Footer />
      </Wrapper>
    </ThemeProvider>
  );
}
