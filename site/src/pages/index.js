import React, { useEffect, useState } from "react";
import BlocksList from "../components/block/list";
import Layout from "../components/layout";

function Blocks() {
  const [listLoading, setListLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setListLoading(false);
    }, 500);
  }, []);

  return (
    <Layout>
      <BlocksList listLoading={listLoading} />
    </Layout>
  );
}

export default Blocks;
