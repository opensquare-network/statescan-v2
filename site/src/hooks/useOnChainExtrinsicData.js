import { useEffect, useState } from "react";
import useOnChainBlockData from "./useOnChainBlockData";
import { extractExtrinsicEvents } from "../utils/extractBlockInfo/extractExtrinsics";
import extractBlockHeader from "../utils/extractBlockInfo/extractBlockHeader";
import extractBlockTime from "../utils/extractBlockInfo/extractBlockTime";

export default function useOnChainExtrinsicData(blockHeight, extrinsicIndex) {
  const blockData = useOnChainBlockData(blockHeight);
  const [extrinsicData, setExtrinsicData] = useState();

  useEffect(() => {
    // block data is still loading
    if (blockData === undefined) {
      return;
    }

    // no block
    if (blockData === null) {
      setExtrinsicData(null);
      return;
    }

    const extrinsic = blockData?.block?.block?.extrinsics?.[extrinsicIndex];
    if (!extrinsic) {
      setExtrinsicData(null);
      return;
    }

    const events = extractExtrinsicEvents(blockData?.events, extrinsicIndex);

    const headerInfo = extractBlockHeader(
      blockData.block.block.header,
      blockData.validators,
    );
    const time = extractBlockTime(blockData.block.block);

    const indexer = {
      blockHash: headerInfo.hash,
      blockHeight: headerInfo.height,
      blockTime: time,
      extrinsicIndex,
    };

    setExtrinsicData({
      extrinsic,
      events,
      indexer,
    });
  }, [blockData, extrinsicIndex]);

  return extrinsicData;
}
