import { useCallback, useEffect, useState } from "react";
import { useChainApi } from "../utils/hooks/chain/useChainApi";

export default function useBlockData(blockHeightOrHash) {
  const api = useChainApi();
  const [blockData, setBlockData] = useState(null);

  const fetchBlockData = useCallback(async () => {
    if (!api) {
      return;
    }

    let blockHash;
    if (
      typeof blockHeightOrHash === "number" ||
      /^\d+$/.test(blockHeightOrHash)
    ) {
      blockHash = await api.rpc.chain.getBlockHash(blockHeightOrHash);
    } else {
      blockHash = blockHeightOrHash;
    }

    const [block, events, validators] = await Promise.all([
      api.rpc.chain.getBlock(blockHash),
      api.query.system.events.at(blockHash),
      api.query.session.validators.at(blockHash),
    ]);

    setBlockData({
      block,
      events,
      validators,
    });
  }, [api, blockHeightOrHash]);

  useEffect(() => {
    fetchBlockData();
  }, [fetchBlockData]);

  return blockData;
}
