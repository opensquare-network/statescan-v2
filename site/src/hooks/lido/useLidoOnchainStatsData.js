import { useLidoStatusData } from "./useLidoStatusData";

const emptyData = {
  stEthTotalSupply: null,
  wstEthTotalSupply: null,
  bufferedEth: null,
  stEthPerToken: null,
  tokensPerStEth: null,
};

export function useLidoOnchainStatsData() {
  return useLidoStatusData("lido-onchain-stats", emptyData);
}

export function useLidoStEthSharesRateData() {
  const queryResult = useLidoStatusData("lido-onchain-stats", {});

  return {
    ...queryResult,
    data: queryResult.data?.stEthSharesRate ?? null,
  };
}
