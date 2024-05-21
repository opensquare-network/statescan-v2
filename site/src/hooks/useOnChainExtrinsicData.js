import { useEffect, useState } from "react";
import useOnChainBlockData from "./useOnChainBlockData";
import extractBlockHeader from "../utils/extractBlockInfo/extractBlockHeader";
import extractBlockTime from "../utils/extractBlockInfo/extractBlockTime";
import useChainSettings from "../utils/hooks/chain/useChainSettings";

export default function useOnChainExtrinsicData(blockHeight, extrinsicIndex) {
  const chainSettings = useChainSettings();
  const blockData = useOnChainBlockData(blockHeight);
  const [extrinsicData, setExtrinsicData] = useState();

  useEffect(() => {
    if (!chainSettings.useOnChainBlockData) {
      return;
    }

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
      allBlockEvents: blockData?.events,
      indexer,
    });
  }, [chainSettings.useOnChainBlockData, blockData, extrinsicIndex]);

  return extrinsicData;
}
