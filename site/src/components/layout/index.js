import styled from "styled-components";
import Container from "./container";
import Header from "../header";
import Background from "../background";
import Footer from "../footer";
import ScrollToTop from "../scrollToTop";
import { getChainSettings } from "../../utils/chain";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  connect,
  disconnect,
  unSubscribeHomepageInfo,
} from "../../services/websocket";
import {
  setLatestBlocks,
  setLatestSignedTransfers,
} from "../../store/reducers/socketSlice";
import { clearNftList } from "../../store/reducers/nftSlice";
import { clearAssetList } from "../../store/reducers/assetSlice";

const Main = styled.main`
  flex-grow: 1;
  margin-top: 32px;
`;

export default function Layout({ children, className }) {
  const { name } = getChainSettings();
  const dispatch = useDispatch();

  useEffect(() => {
    connect();

    return () => {
      unSubscribeHomepageInfo();
      disconnect();
      dispatch(setLatestSignedTransfers([]));
      dispatch(setLatestBlocks([]));
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
    </>
  );
}
