import { useCallback, useEffect, useState } from "react";
import evmPublicClient from "../../services/evm/client";

export function useLidoEvmBalanceData(address) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(() => {
    if (!evmPublicClient || !address) {
      setData(null);
      return;
    }

    setLoading(true);

    evmPublicClient
      .getBalance({ address })
      .then((balance) => {
        setData(balance.toString());
      })
      .catch(() => {
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
  };
}
