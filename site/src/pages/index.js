import React, { useEffect } from "react";
import Layout from "../components/layout";
import Explore from "../components/home/explore";
import Sections from "../components/home/sections/index";
import { connect, unSubscribeHomepageInfo } from "../services/websocket";
import { useDispatch } from "react-redux";
import {
  setLatestBlocks,
  setLatestSignedTransfers,
} from "../store/reducers/socketSlice";
import styled from "styled-components";
import Overview from "../components/home/overview";

const SectionsWrapper = styled.div`
  margin-top: 32px;
`;

const OverviewWrapper = styled.div`
  margin-top: 40px;
`;

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    connect();

    return () => {
      unSubscribeHomepageInfo();
      dispatch(setLatestSignedTransfers([]));
      dispatch(setLatestBlocks([]));
    };
  }, [dispatch]);

  return (
    <Layout>
      <Explore />

      <OverviewWrapper>
        <Overview />
      </OverviewWrapper>

      <SectionsWrapper>
        <Sections />
      </SectionsWrapper>
    </Layout>
  );
}

export default Home;
