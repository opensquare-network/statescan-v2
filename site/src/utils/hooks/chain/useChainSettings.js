import { getEnvChain } from "../../env";
import chains from "../../consts/chains";

/**
 * @returns {typeof chains.kusama}
 */
export default function useChainSettings() {
  const chain = getEnvChain();

  return chains[chain];
}
