import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import Container from "./container";

const GlobalStyle = createGlobalStyle`
  #nprogress .bar {
    background: ${(p) => p.thmeColor};
  }

  #nprogress .peg {
    box-shadow: 0 0 10px ${(p) => p.thmeColor}, 0 0 5px ${(p) => p.thmeColor};
  }
`;

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
  return (
    <>
      {/*todo: get themeColor from theme Object*/}
      <GlobalStyle />
      <Wrapper>
        <Main>
          <Container>{children}</Container>
        </Main>
      </Wrapper>
    </>
  );
}
