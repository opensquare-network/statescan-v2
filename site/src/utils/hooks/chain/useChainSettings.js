import { getEnvChain } from "../../env";
import chains from "../../consts/chains";

export default function useChainSettings() {
  const chain = getEnvChain();
  return chains[chain];
}
