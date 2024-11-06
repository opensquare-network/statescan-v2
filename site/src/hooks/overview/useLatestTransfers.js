import { useCallback } from "react";
import { createGlobalState, useInterval } from "react-use";
import api from "../../services/api";
import { latestTransfersApi } from "../../services/urls";
import useIsRelayChain from "../../utils/hooks/chain/useIsRelayChain";

const useGlobalTransfers = createGlobalState([]);
const useGlobalLoading = createGlobalState(true);
const useGlobalIsFetching = createGlobalState(false);

export default function useLatestTransfers() {
  const [transfers, setTransfers] = useGlobalTransfers();
  const [loading, setIsLoading] = useGlobalLoading();
  const [isFetching, setIsFetching] = useGlobalIsFetching();

  const isRelay = useIsRelayChain();

  const fetchTransfers = useCallback(() => {
    if (isFetching) {
      return;
    }

    setIsFetching(true);

    api
      .fetch(latestTransfersApi)
      .then((resp) => {
        setTransfers(resp.result || []);
        setIsLoading(false);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, [isFetching, setTransfers, setIsLoading, setIsFetching]);

  useInterval(
    () => {
      fetchTransfers();
    },
    isRelay ? 6000 : 12000,
  );

  return { transfers, loading };
}
