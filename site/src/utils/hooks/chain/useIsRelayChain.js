import chains from "../../consts/chains";
import useChain from "./useChain";

export default function useIsRelayChain() {
  const chain = useChain();
  return [chains.polkadot.value, chains.kusama.value].includes(chain);
}
