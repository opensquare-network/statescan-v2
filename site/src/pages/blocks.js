import React from "react";
import Layout from "../components/layout";
import BreadCrumb from "../components/breadCrumb";
import Table from "../components/table";
import { Panel } from "../components/styled/panel";
import { blocksHead } from "../utils/constants";
import { useEffect, useState } from "react";
import Api from "../services/api";
import Link from "../components/styled/link";
import { addressEllipsis, hashEllipsis } from "../utils/viewFuncs/text";
import { ReactComponent as CheckIcon } from "../components/icons/check.svg";

function Blocks() {
  const [blocks, setBlocks] = useState([]);
  //todo: might use redux to pass data
  useEffect(() => {
    Api.fetch(`/blocks`).then(({ result }) => {
      setBlocks(result?.items ?? []);
    });
  }, []);

  const data = blocks.map((block, index) => {
    return [
      <Link key={`${index}-1`} to={`/block/${block?.height}`}>
        {block?.height?.toLocaleString()}
      </Link>,
      block?.time,
      <CheckIcon />,
      hashEllipsis(block.hash),
      addressEllipsis(block.validator),
      block?.extrinsicsCount,
      block?.eventsCount,
    ];
  });
  console.log(blocks);
  return (
    <Layout>
      <BreadCrumb data={[{ name: "Blocks" }]} />
      <Panel>
        <Table heads={blocksHead} data={data} />
      </Panel>
    </Layout>
  );
}

export default Blocks;
