import { useCallback, useEffect, useState } from "react";
import evmPublicClient from "../../services/evm/client";
import {
  LIDO_LOCATOR_ABI,
  LIDO_LOCATOR_ADDRESS,
} from "../../services/evm/lido";

export function useLidoTreasuryAddressData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (!evmPublicClient) {
      setData(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const treasuryAddress = await evmPublicClient.readContract({
        address: LIDO_LOCATOR_ADDRESS,
        abi: LIDO_LOCATOR_ABI,
        functionName: "treasury",
      });

      setData(treasuryAddress);
    } catch {
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading };
}
