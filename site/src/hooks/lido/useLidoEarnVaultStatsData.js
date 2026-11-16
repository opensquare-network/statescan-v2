import { useLidoStatusData } from "./useLidoStatusData";

const emptyData = {
  totalSupply: null,
  totalShares: null,
  activeShares: null,
  pendingBalance: null,
};

export function useLidoEarnVaultStatsData(type) {
  const queryResult = useLidoStatusData("lido-earn-vault-stats", {
    items: [],
  });
  const item = queryResult.data?.items?.find((item) => item.type === type);

  return {
    ...queryResult,
    data: item
      ? {
          totalSupply: item.totalSupply,
          totalShares: item.totalShares,
          activeShares: item.activeShares,
          pendingBalance: item.pendingBalance,
        }
      : emptyData,
    vaultAddress: item?.vaultAddress ?? null,
    shareManagerAddress: item?.shareManagerAddress ?? null,
    riskManagerAddress: item?.riskManagerAddress ?? null,
  };
}
