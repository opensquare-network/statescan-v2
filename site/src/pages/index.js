import React, { useEffect, useState } from "react";
import BlocksList from "../components/block/list";

function Blocks() {
  const [listLoading, setListLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setListLoading(false);
    }, 500);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Blocks</h1>
        <BlocksList listLoading={listLoading} />
      </header>
    </div>
  );
}

export default Blocks;
