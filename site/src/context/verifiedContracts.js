import { createContext, useContext, useEffect, useState } from "react";
import chains from "../utils/consts/chains";
import { getEnvChain } from "../utils/env";
import { loadVerifiedContracts } from "../services/verifiedContracts";

const VerifiedContractsVersionContext = createContext(0);

const chain = chains[getEnvChain()];
const hasRevive = chain?.modules?.revive === true;

export function VerifiedContractsProvider({ children }) {
  const [version, setVersion] = useState(0);

  useEffect(() => {
    if (!hasRevive) {
      return;
    }

    let mounted = true;
    loadVerifiedContracts().finally(() => {
      if (mounted) {
        setVersion((value) => value + 1);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <VerifiedContractsVersionContext.Provider value={version}>
      {children}
    </VerifiedContractsVersionContext.Provider>
  );
}

// Components which build decoded data in a memo or an effect read this to
// recompute once the verified contracts are loaded.
export function useVerifiedContractsVersion() {
  return useContext(VerifiedContractsVersionContext);
}
