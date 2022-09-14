import styled from "styled-components";
import Container from "./container";

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
    <Wrapper>
      <Main>
        <Container>{children}</Container>
      </Main>
    </Wrapper>
  );
}
