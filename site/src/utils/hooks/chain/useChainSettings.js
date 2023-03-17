import { getEnvChain } from "../../env";
import chains from "../../consts/chains";

export default function useChainSettings() {
  const chain = getEnvChain();

  /**
   * @type {typeof chains.kusama}
   */
  return chains[chain];
}
