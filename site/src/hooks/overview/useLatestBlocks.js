import { useCallback } from "react";
import { createGlobalState, useEffectOnce, useInterval } from "react-use";
import api from "../../services/api";
import { latestBlocksApi } from "../../services/urls";
import useIsRelayChain from "../../utils/hooks/chain/useIsRelayChain";

const useGlobalBlocks = createGlobalState([]);
const useGlobalLoading = createGlobalState(true);
const useGlobalIsFetching = createGlobalState(false);

export default function useLatestBlocks() {
  const [blocks, setBlocks] = useGlobalBlocks();
  const [loading, setLoading] = useGlobalLoading();
  const [isFetching, setIsFetching] = useGlobalIsFetching();

  const isRelay = useIsRelayChain();

  const fetchBlocks = useCallback(() => {
    if (isFetching) {
      return;
    }

    setIsFetching(true);

    api
      .fetch(latestBlocksApi)
      .then((resp) => {
        setBlocks(resp.result || []);
        setLoading(false);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, [isFetching, setBlocks, setLoading, setIsFetching]);

  useEffectOnce(fetchBlocks);

  useInterval(
    () => {
      fetchBlocks();
    },
    isRelay ? 6000 : 12000,
  );

  return { blocks, loading };
}
