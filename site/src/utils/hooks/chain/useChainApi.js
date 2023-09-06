import { useEffect, useState } from "react";
import { getChainApi } from "../../../services/chainApi";
import useChain from "./useChain";
import { useSelector } from "react-redux";
import { currentNodeSelector } from "../../../store/reducers/nodeSlice";

export function useChainApi() {
  const chain = useChain();
  const currentNode = useSelector(currentNodeSelector);
  const [chainApi, setChainApi] = useState();

  useEffect(() => {
    getChainApi(chain, currentNode).then(setChainApi);
  }, [chain, currentNode]);

  return chainApi;
}
