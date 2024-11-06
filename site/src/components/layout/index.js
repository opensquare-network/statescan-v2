import styled from "styled-components";
import Container from "./container";
import Header from "../header";
import Background from "../background";
import Footer from "../footer";
import ScrollToTop from "../scrollToTop";
import { getChainSettings } from "../../utils/chain";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearNftList } from "../../store/reducers/nftSlice";
import { clearAssetList } from "../../store/reducers/assetSlice";
import Toast from "../toast";

const Main = styled.main`
  flex-grow: 1;
  margin-top: 32px;
`;

export default function Layout({ children, className }) {
  const { name } = getChainSettings();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearNftList());
      dispatch(clearAssetList());
    };
  }, [dispatch]);

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

      <Toast />
    </>
  );
}
