import React from "react";
import Layout from "../components/layout";
import Explore from "../components/home/explore";
import Sections from "../components/home/sections/index";

function Blocks() {
  return (
    <Layout>
      <Explore />
      <Sections />
    </Layout>
  );
}

export default Blocks;
