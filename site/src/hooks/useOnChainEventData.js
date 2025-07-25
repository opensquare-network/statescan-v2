import { useEffect, useState } from "react";
import useOnChainBlockData from "./useOnChainBlockData";
import getBlockIndexer from "../utils/indexer";

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

    const blockIndexer = getBlockIndexer(blockData.block);
    const indexer = {
      ...blockIndexer,
      eventIndex,
    };

    setEventData({
      event,
      indexer,
    });
  }, [blockData, eventIndex]);

  return eventData;
}
