import { useCallback, useEffect, useState } from "react";
import { erc20Abi } from "viem";
import evmPublicClient from "../../services/evm/client";
import { LIDO_STETH_ADDRESS } from "../../services/evm/lido";

export function useLidoStEthBalanceData(accountAddress) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(() => {
    if (!evmPublicClient || !accountAddress) {
      setData(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    evmPublicClient
      .readContract({
        address: LIDO_STETH_ADDRESS,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [accountAddress],
      })
      .then((balance) => {
        setData(balance.toString());
      })
      .catch(() => {
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [accountAddress]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
  };
}
