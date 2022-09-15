import styled, { ThemeProvider } from "styled-components";
import Container from "./container";
import Header from "../header";
import { useDispatch, useSelector } from "react-redux";
import { setTheme, themeSelector } from "../../store/reducers/themeSlice";
import light from "../../styles/theme/light";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex-grow: 1;
  margin-top: 24px;
  z-index: 1;
`;

export default function Layout({ children }) {
  const dispatch = useDispatch();
  //fix me : make theme dynamic
  dispatch(setTheme(light));

  const theme = useSelector(themeSelector);

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Header />
        <Main>
          <Container>{children}</Container>
        </Main>
      </Wrapper>
    </ThemeProvider>
  );
}
