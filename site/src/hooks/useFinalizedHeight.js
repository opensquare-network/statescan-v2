import { useEffect, useState } from "react";
import { useChainApi } from "../utils/hooks/chain/useChainApi";

export default function useFinalizedHeight() {
  const api = useChainApi();
  const [finalizedHeight, setFinalizedHeight] = useState(null);

  useEffect(() => {
    if (!api) {
      return;
    }

    let unsub = null;
    api.rpc.chain
      .subscribeFinalizedHeads(async (header) => {
        setFinalizedHeight(header.number.toNumber());
      })
      .then((result) => (unsub = result));

    return () => {
      if (unsub) {
        unsub();
      }
    };
  }, [api]);

  return finalizedHeight;
}
