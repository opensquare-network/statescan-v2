import { useCallback, useEffect, useState } from "react";
import evmPublicClient from "../../services/evm/client";
import { LIDO_WITHDRAWAL_VAULT_ADDRESS } from "../../services/evm/lido";

export function useLidoWithdrawalVaultBalanceData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!evmPublicClient) {
      setData(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const balance = await evmPublicClient.getBalance({
        address: LIDO_WITHDRAWAL_VAULT_ADDRESS,
      });

      setData(balance.toString());
    } catch (e) {
      setError(e);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}
