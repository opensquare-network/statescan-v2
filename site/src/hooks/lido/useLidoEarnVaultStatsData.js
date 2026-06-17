import { useCallback, useEffect, useState } from "react";
import evmPublicClient from "../../services/evm/client";
import {
  LIDO_EARN_ETH_VAULT_ADDRESS,
  LIDO_EARN_RISK_MANAGER_ABI,
  LIDO_EARN_SHARE_MANAGER_ABI,
  LIDO_EARN_USD_VAULT_ADDRESS,
  LIDO_EARN_VAULT_ABI,
} from "../../services/evm/lido";
import { normalizeEvmAddress } from "../../utils/normalizeAddress";

const emptyData = {
  totalSupply: null,
  totalShares: null,
  activeShares: null,
  pendingBalance: null,
};

const vaultAddresses = {
  eth: LIDO_EARN_ETH_VAULT_ADDRESS,
  usd: LIDO_EARN_USD_VAULT_ADDRESS,
};

function getEarnVaultAddress(type) {
  return normalizeEvmAddress(vaultAddresses[type]);
}

async function readManagerAddress(vaultAddress, functionName) {
  return await evmPublicClient.readContract({
    address: vaultAddress,
    abi: LIDO_EARN_VAULT_ABI,
    functionName,
  });
}

async function readShareManagerStats(shareManagerAddress) {
  const [totalSupply, totalShares, activeShares] = await Promise.all(
    ["totalSupply", "totalShares", "activeShares"].map((functionName) =>
      evmPublicClient.readContract({
        address: shareManagerAddress,
        abi: LIDO_EARN_SHARE_MANAGER_ABI,
        functionName,
      }),
    ),
  );

  return {
    totalSupply,
    totalShares,
    activeShares,
  };
}

async function readRiskManagerStats(riskManagerAddress) {
  const pendingBalance = await evmPublicClient.readContract({
    address: riskManagerAddress,
    abi: LIDO_EARN_RISK_MANAGER_ABI,
    functionName: "pendingBalance",
  });

  return {
    pendingBalance,
  };
}

export function useLidoEarnVaultStatsData(type) {
  const [data, setData] = useState(emptyData);
  const [loading, setLoading] = useState(false);
  const [shareManagerAddress, setShareManagerAddress] = useState(null);
  const [riskManagerAddress, setRiskManagerAddress] = useState(null);
  const vaultAddress = getEarnVaultAddress(type);

  const fetchData = useCallback(async () => {
    if (!evmPublicClient || !vaultAddress) {
      setData(emptyData);
      setShareManagerAddress(null);
      setRiskManagerAddress(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const [shareManager, riskManager] = await Promise.all([
        readManagerAddress(vaultAddress, "shareManager"),
        readManagerAddress(vaultAddress, "riskManager"),
      ]);
      const normalizedShareManager = normalizeEvmAddress(shareManager);
      const normalizedRiskManager = normalizeEvmAddress(riskManager);
      const [{ totalSupply, totalShares, activeShares }, { pendingBalance }] =
        await Promise.all([
          readShareManagerStats(normalizedShareManager),
          readRiskManagerStats(normalizedRiskManager),
        ]);

      setData({
        totalSupply: totalSupply.toString(),
        totalShares: totalShares.toString(),
        activeShares: activeShares.toString(),
        pendingBalance: pendingBalance.toString(),
      });
      setShareManagerAddress(normalizedShareManager);
      setRiskManagerAddress(normalizedRiskManager);
    } catch {
      setData(emptyData);
      setShareManagerAddress(null);
      setRiskManagerAddress(null);
    } finally {
      setLoading(false);
    }
  }, [vaultAddress]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    vaultAddress,
    shareManagerAddress,
    riskManagerAddress,
  };
}
