import { useEffect, useState } from "react";
import useOnChainBlockData from "./useOnChainBlockData";
import extractBlockHeader from "../utils/extractBlockInfo/extractBlockHeader";
import extractBlockTime from "../utils/extractBlockInfo/extractBlockTime";

export default function useOnChainEventData(blockHeight, eventIndex) {
  const blockData = useOnChainBlockData(blockHeight);
  const [eventData, setEventData] = useState();

  useEffect(() => {
    // block data is still loading
    if (blockData === undefined) {
      return;
    }

    // no block
    if (blockData === null) {
      setEventData(null);
      return;
    }

    const event = blockData?.events?.[eventIndex];
    if (!event) {
      setEventData(null);
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
      eventIndex,
    };

    setEventData({
      event,
      indexer,
    });
  }, [blockData, eventIndex]);

  return eventData;
}
