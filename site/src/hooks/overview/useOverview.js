import { useCallback } from "react";
import { createGlobalState, useInterval } from "react-use";
import api from "../../services/api";
import { overviewApi } from "../../services/urls";
import useIsRelayChain from "../../utils/hooks/chain/useIsRelayChain";

const useGlobalData = createGlobalState({});
const useGlobalLoading = createGlobalState(true);
const useGlobalFetching = createGlobalState(false);

export default function useOverview() {
  const [overview, setOverview] = useGlobalData();
  const [loading, setLoading] = useGlobalLoading();
  const [isFetching, setIsFetching] = useGlobalFetching();

  const isRelay = useIsRelayChain();

  const fetchOverview = useCallback(() => {
    if (isFetching) {
      return;
    }

    setIsFetching(true);

    api
      .fetch(overviewApi)
      .then((resp) => {
        setOverview(resp.result || {});
        setLoading(false);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, [isFetching, setOverview, setIsFetching, setLoading]);

  useInterval(
    () => {
      fetchOverview();
    },
    isRelay ? 6000 : 12000,
  );

  return { overview, loading };
}
