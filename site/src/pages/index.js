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
import Tooltip from "../components/tooltip";

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
      <Tooltip>
        <h1>test</h1>
      </Tooltip>
      <Explore />
      <Sections />
    </Layout>
  );
}

export default Home;
