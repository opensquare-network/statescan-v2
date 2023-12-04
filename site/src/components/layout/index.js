import styled from "styled-components";
import Container from "./container";
import Header from "../header";
import Background from "../background";
import Footer from "../footer";
import ScrollToTop from "../scrollToTop";
import { getChainSettings } from "../../utils/chain";
import { useEffect } from "react";

const Main = styled.main`
  flex-grow: 1;
  margin-top: 32px;
`;

export default function Layout({ children, className }) {
  const { name } = getChainSettings();

  useEffect(() => {
    document.title = `${name} Blockchain Explorer`;
  }, [name]);

  return (
    <>
      <Background />

      <Container className={className}>
        <Header />

        <Main>{children}</Main>

        <Footer />
      </Container>

      <ScrollToTop />
    </>
  );
}
