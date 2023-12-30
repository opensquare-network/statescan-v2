import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  currentNodeSelector,
  removeCurrentNode,
  setCurrentNode,
} from "../../../store/reducers/nodeSlice";
import { getEnvChain } from "../../env";
import { getChainNodes } from "../../chain";
import useCandidateNodes from "./apis/useCandidateNodes";
import getApiInSeconds, { getApi } from "./apis/getApi";

export function useChainApi() {
  const chain = getEnvChain();
  const currentEndpoint = useSelector(currentNodeSelector);
  const [api, setApi] = useState();
  const chainNodes = getChainNodes();
  const dispatch = useDispatch();
  const candidateNodes = useCandidateNodes();

  useEffect(() => {
    if (currentEndpoint) {
      getApiInSeconds(chain, currentEndpoint)
        .then((api) => {
          setApi(api);
        })
        .catch(() => {
          if (chainNodes.length > 1) {
            dispatch(removeCurrentNode()); // remove current node to trigger the best node selection
          }
        });
    } else {
      Promise.any(
        candidateNodes.map((endpoint) => getApi(chain, endpoint)),
      ).then((api) => {
        setApi(api);
        const endpoint = api._options.provider.endpoint;
        dispatch(setCurrentNode({ url: endpoint, saveLocalStorage: false }));
      });
    }
  }, [currentEndpoint, chain, dispatch, chainNodes, candidateNodes]);

  return api;
}
