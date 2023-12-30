import { useMemo } from "react";
import { getEnvChain } from "../../../env";
import { getChainSettings } from "../../../chain";
import { useSelector } from "react-redux";
import {
  currentNodeSelector,
  needUpdateNodesSelector,
} from "../../../../store/reducers/nodeSlice";

export default function useCandidateNodes() {
  const chain = getEnvChain();
  const currentEndpoint = useSelector(currentNodeSelector);
  const settings = getChainSettings(chain);
  const chainNodeUrls = settings.nodes.map((item) => item.url);
  const needUpdateNodes = useSelector(needUpdateNodesSelector);

  return useMemo(() => {
    const first3Nodes = chainNodeUrls.slice(0, 3);
    const candidates = new Set(first3Nodes);
    if (currentEndpoint) {
      candidates.add(currentEndpoint);
    }

    for (const needUpdateNode of needUpdateNodes) {
      candidates.add(needUpdateNode);
    }

    return [...candidates];
  }, [currentEndpoint, chainNodeUrls, needUpdateNodes]);
}
