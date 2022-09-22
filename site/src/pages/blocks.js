import React from "react";
import Layout from "../components/layout";
import BreadCrumb from "../components/breadCrumb";

function Blocks() {
  return (
    <Layout>
      <BreadCrumb data={[{ name: "Blocks" }]} />
    </Layout>
  );
}

export default Blocks;
