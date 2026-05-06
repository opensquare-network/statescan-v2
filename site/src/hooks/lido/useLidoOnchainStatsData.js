import { useCallback, useEffect, useState } from "react";
import { erc20Abi } from "viem";
import evmPublicClient from "../../services/evm/client";
import {
  LIDO_BUFFERED_ETHER_ABI,
  LIDO_STETH_ADDRESS,
  LIDO_WSTETH_ADDRESS,
  WSTETH_RATE_ABI,
} from "../../services/evm/lido";

const emptyData = {
  stEthTotalSupply: null,
  wstEthTotalSupply: null,
  bufferedEth: null,
  stEthPerToken: null,
  tokensPerStEth: null,
};

const contracts = [
  {
    address: LIDO_STETH_ADDRESS,
    abi: erc20Abi,
    functionName: "totalSupply",
  },
  {
    address: LIDO_WSTETH_ADDRESS,
    abi: erc20Abi,
    functionName: "totalSupply",
  },
  {
    address: LIDO_STETH_ADDRESS,
    abi: LIDO_BUFFERED_ETHER_ABI,
    functionName: "getBufferedEther",
  },
  {
    address: LIDO_WSTETH_ADDRESS,
    abi: WSTETH_RATE_ABI,
    functionName: "stEthPerToken",
  },
  {
    address: LIDO_WSTETH_ADDRESS,
    abi: WSTETH_RATE_ABI,
    functionName: "tokensPerStEth",
  },
];

export function useLidoOnchainStatsData() {
  const [data, setData] = useState(emptyData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!evmPublicClient) {
      setData(emptyData);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [
        stEthTotalSupply,
        wstEthTotalSupply,
        bufferedEth,
        stEthPerToken,
        tokensPerStEth,
      ] = await Promise.all(
        contracts.map((contract) => evmPublicClient.readContract(contract)),
      );

      setData({
        stEthTotalSupply: stEthTotalSupply.toString(),
        wstEthTotalSupply: wstEthTotalSupply.toString(),
        bufferedEth: bufferedEth.toString(),
        stEthPerToken: stEthPerToken.toString(),
        tokensPerStEth: tokensPerStEth.toString(),
      });
    } catch (e) {
      setError(e);
      setData(emptyData);
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
