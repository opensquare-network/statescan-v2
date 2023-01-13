import styled from "styled-components";
import Container from "./container";
import Header from "../header";
import { useSelector } from "react-redux";
import Background from "../background";
import Footer from "../footer";
import Tip from "../tooltip/tip";
import { tooltipContentSelector } from "../../store/reducers/tooltipSlice";
import ScrollToTop from "../scrollToTop";
import { getChainSettings } from "../../utils/chain";
import { useEffect } from "react";

const Main = styled.main`
  flex-grow: 1;
  margin-top: 32px;
`;

export default function Layout({ children, className }) {
  const tooltipContent = useSelector(tooltipContentSelector);
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

        <Tip>{tooltipContent}</Tip>
      </Container>

      <ScrollToTop />
    </>
  );
}
