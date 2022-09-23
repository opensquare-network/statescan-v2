import React from "react";
import Layout from "../components/layout";
import BreadCrumb from "../components/breadCrumb";
import Table from "../components/table";
import { Panel } from "../components/styled/panel";
import { blocksHead } from "../utils/constants";

function Blocks() {
  return (
    <Layout>
      <BreadCrumb data={[{ name: "Blocks" }]} />
      <Panel>
        <Table heads={blocksHead} />
      </Panel>
    </Layout>
  );
}

export default Blocks;
