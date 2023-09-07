import { useEffect, useState } from "react";
import { getChainApi } from "../../../services/chainApi";
import { useSelector } from "react-redux";
import { currentNodeSelector } from "../../../store/reducers/nodeSlice";

export function useChainApi() {
  const currentNode = useSelector(currentNodeSelector);
  const [chainApi, setChainApi] = useState();

  useEffect(() => {
    getChainApi(currentNode).then(setChainApi);
  }, [currentNode]);

  return chainApi;
}
