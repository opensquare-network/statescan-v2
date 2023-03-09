import { useEffect, useState } from "react";
import { getChainApi } from "../../../services/chainApi";
import useChain from "./useChain";

export function useChainApi() {
  const chain = useChain();
  const [chainApi, setChainApi] = useState();

  useEffect(() => {
    getChainApi(chain).then(setChainApi);
  }, [chain]);

  return chainApi;
}
