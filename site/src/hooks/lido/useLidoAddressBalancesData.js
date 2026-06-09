import { useCallback, useEffect, useState } from "react";
import { erc20Abi } from "viem";
import evmPublicClient from "../../services/evm/client";
import {
  LIDO_STETH_ADDRESS,
  LIDO_STETH_SHARES_ABI,
  LIDO_WSTETH_ADDRESS,
} from "../../services/evm/lido";
import { normalizeEvmAddress } from "../../utils/normalizeAddress";

const emptyData = {
  stEthBalance: null,
  stEthShares: null,
  wstEthBalance: null,
};

export function useLidoAddressBalancesData(address) {
  const [data, setData] = useState(emptyData);
  const [loading, setLoading] = useState(false);

  const normalizedAddress = normalizeEvmAddress(address);

  const fetchData = useCallback(async () => {
    if (!evmPublicClient || !normalizedAddress) {
      setData(emptyData);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const [stEthBalance, stEthShares, wstEthBalance] = await Promise.all([
        evmPublicClient.readContract({
          address: LIDO_STETH_ADDRESS,
          abi: erc20Abi,
          functionName: "balanceOf",
          args: [normalizedAddress],
        }),
        evmPublicClient.readContract({
          address: LIDO_STETH_ADDRESS,
          abi: LIDO_STETH_SHARES_ABI,
          functionName: "sharesOf",
          args: [normalizedAddress],
        }),
        evmPublicClient.readContract({
          address: LIDO_WSTETH_ADDRESS,
          abi: erc20Abi,
          functionName: "balanceOf",
          args: [normalizedAddress],
        }),
      ]);

      setData({
        stEthBalance: stEthBalance.toString(),
        stEthShares: stEthShares.toString(),
        wstEthBalance: wstEthBalance.toString(),
      });
    } catch {
      setData(emptyData);
    } finally {
      setLoading(false);
    }
  }, [normalizedAddress]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
  };
}
