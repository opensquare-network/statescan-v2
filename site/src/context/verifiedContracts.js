import { createContext, useContext, useEffect, useState } from "react";
import { loadVerifiedContracts } from "../services/verifiedContracts";
import { hasRevive } from "../utils/chain";

const VerifiedContractsVersionContext = createContext(0);

export function VerifiedContractsProvider({ children }) {
  const [version, setVersion] = useState(0);

  useEffect(() => {
    if (!hasRevive()) {
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
