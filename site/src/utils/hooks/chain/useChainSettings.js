import { getEnvChain } from "../../env";
import chains from "../../consts/chains";

export default function useChainSettings() {
  const chain = getEnvChain();

  /**
   * @type {typeof chains.kusama}
   */
  const chainData = chains[chain];

  const data = {
    ...chainData,
    subsquareWebsite: `https://${chainData}.subsquare.io`
  }

  return data
}
