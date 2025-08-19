import { useEffect, useState } from "react";
import useOnChainBlockData from "./useOnChainBlockData";
import useChainSettings from "../utils/hooks/chain/useChainSettings";
import getBlockIndexer from "../utils/indexer";

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

    const blockIndexer = getBlockIndexer(blockData.block.block);
    const indexer = {
      ...blockIndexer,
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
