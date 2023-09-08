import { useEffect } from "react";
import { useChainApi } from "../utils/hooks/chain/useChainApi";
import { useDispatch, useSelector } from "react-redux";
import {
  finalizedHeightSelector,
  setFinalizedHeight,
} from "../store/reducers/chainSlice";

export default function useSubFinalizedHeight() {
  const dispatch = useDispatch();
  const api = useChainApi();
  const finalizedHeight = useSelector(finalizedHeightSelector);

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

  return finalizedHeight;
}
