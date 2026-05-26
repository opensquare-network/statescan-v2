import { useCallback, useEffect, useState } from "react";
import { parseEther } from "viem";
import evmPublicClient from "../../services/evm/client";
import {
  LIDO_STETH_ADDRESS,
  LIDO_STETH_SHARES_ABI,
} from "../../services/evm/lido";

const ONE_SHARE = parseEther("1");

export function useLidoStEthSharesRateData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(() => {
    if (!evmPublicClient) {
      setData(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    evmPublicClient
      .readContract({
        address: LIDO_STETH_ADDRESS,
        abi: LIDO_STETH_SHARES_ABI,
        functionName: "getPooledEthByShares",
        args: [ONE_SHARE],
      })
      .then((rate) => {
        setData(rate.toString());
      })
      .catch(() => {
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
  };
}
