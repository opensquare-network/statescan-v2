import React, { useEffect } from "react";
import Layout from "../components/layout";
import Explore from "../components/home/explore";
import Sections from "../components/home/sections/index";
import { connect } from "../services/websocket";

function Blocks() {
  useEffect(() => {
    connect();
  }, []);

  return (
    <Layout>
      <Explore />
      <Sections />
    </Layout>
  );
}

export default Blocks;
