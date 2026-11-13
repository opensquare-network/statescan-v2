import { useEffect, useState } from "react";
import api from "../../services/api";
import { reviveAccountSummaryApi } from "../../services/urls";
import { normalizeEvmAddress } from "../../utils/reviveAddress";

export default function useReviveAccountSummary(address, substrateAddress) {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const evmAddress = normalizeEvmAddress(address);
    const queryAddress = evmAddress || address;
    if (!queryAddress) {
      setSummary(null);
      return;
    }

    let mounted = true;
    api
      .fetch(reviveAccountSummaryApi(queryAddress, substrateAddress))
      .then(({ result }) => {
        if (mounted) {
          setSummary(result || null);
        }
      })
      .catch(() => {
        if (mounted) {
          setSummary(null);
        }
      });

    return () => {
      mounted = false;
    };
  }, [address, substrateAddress]);

  return summary;
}
