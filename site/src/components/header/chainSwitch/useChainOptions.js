import { useMemo } from "react";
import chains from "../../../utils/consts/chains";
import useChain from "../../../utils/hooks/chain/useChain";

const polkadotChains = Object.values(chains).filter(
  (i) => i.chain === "polkadot",
);
const kusamaChains = Object.values(chains).filter((i) => i.chain === "kusama");
const westendChains = Object.values(chains).filter(
  (i) => i.chain === "westend",
);
const paseoChains = Object.values(chains).filter((i) => i.chain === "paseo");
const ethereumChains = Object.values(chains).filter(
  (i) => i.chain === "ethereum",
);
const testnetOrSoloChains = Object.values(chains).filter((i) => !i.chain);

export default function useChainOptions() {
  const chain = useChain();

  return useMemo(() => {
    const chainOptionCandidate = [
      {
        title: "Polkadot & Parachains",
        chains: polkadotChains,
      },
      {
        title: "Kusama & Parachains",
        chains: kusamaChains,
      },
      {
        title: "Westend Parachains",
        chains: westendChains,
      },
      testnetOrSoloChains.length > 0 && {
        title: "Solo chains & Testnet",
        chains: testnetOrSoloChains,
      },
      paseoChains.length > 0 && {
        title: "Paseo & Parachains",
        chains: paseoChains,
      },
    ];

    const ethereumChainOption = ethereumChains.length > 0 && {
      title: "Ethereum",
      chains: ethereumChains,
    };

    if (chain === "ethereum") {
      chainOptionCandidate.unshift(ethereumChainOption);
    } else {
      chainOptionCandidate.push(ethereumChainOption);
    }

    return chainOptionCandidate.filter(Boolean);
  }, [chain]);
}
