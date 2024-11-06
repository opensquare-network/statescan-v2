import { useInterval } from "react-use";
import { getEnvChain } from "../../utils/env";
import chains from "../../utils/consts/chains";
import { useDispatch } from "react-redux";
import { useCallback } from "react";

export default function useLatestBlocks() {
  const chain = getEnvChain();
  const isRelay = [chains.polkadot.value, chains.kusama.value].includes(chain);
  const dispatch = useDispatch();

  const fetchBlocks = useCallback(() => {}, []);

  useInterval(() => {}, isRelay ? 6000 : 12000);
}
