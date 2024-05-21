import { getEnvChain } from "../../../env";
import useCandidateNodes from "./useCandidateNodes";
import { useEffect } from "react";
import newApi from "../../../../services/chainApi";

export default function useConnectApis() {
  const chain = getEnvChain();
  const candidateNodes = useCandidateNodes();

  useEffect(() => {
    for (const endpoint of candidateNodes) {
      newApi(chain, endpoint);
    }
  }, [chain, candidateNodes]);
}
