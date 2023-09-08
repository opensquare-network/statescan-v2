import { useEffect } from "react";
import { useChainApi } from "../utils/hooks/chain/useChainApi";
import { useDispatch } from "react-redux";
import { setFinalizedHeight } from "../store/reducers/chainSlice";

export default function useSubFinalizedHeight() {
  const dispatch = useDispatch();
  const api = useChainApi();

  useEffect(() => {
    if (!api) {
      return;
    }

    let unsub = null;
    api.rpc.chain
      .subscribeFinalizedHeads(async (header) => {
        dispatch(setFinalizedHeight(header.number.toNumber()));
      })
      .then((result) => (unsub = result));

    return () => {
      if (unsub) {
        unsub();
      }
    };
  }, [api, dispatch]);
}
