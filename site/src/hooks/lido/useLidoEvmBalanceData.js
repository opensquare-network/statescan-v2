import { useCallback, useEffect, useState } from "react";
import evmPublicClient from "../../services/evm/client";

export function useLidoEvmBalanceData(address) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(() => {
    if (!evmPublicClient || !address) {
      setData(null);
      return;
    }

    setLoading(true);
    setError(null);

    evmPublicClient
      .getBalance({ address })
      .then((balance) => {
        setData(balance.toString());
      })
      .catch((e) => {
        setError(e);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [address]);

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
