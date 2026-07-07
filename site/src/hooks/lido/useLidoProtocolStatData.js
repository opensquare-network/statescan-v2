import {
  GET_LIDO_SERVER_LAST_DAILY_STATS,
  GET_LIDO_SERVER_STETH_TOTALS,
  GET_LIDO_SERVER_WSTETH_TOTALS,
} from "../../services/gql/lido";
import { useLidoServerQuery } from "./useLidoQuery";

const WITHDRAWAL_VAULT_RECEIVED_STAT_ID = "withdrawalVaultETHReceived";
const REWARDS_VAULT_RECEIVED_STAT_ID = "rewardsVaultETHReceived";

function getLastDailyProtocolStatsData(lastDailyStats) {
  return {
    [WITHDRAWAL_VAULT_RECEIVED_STAT_ID]: {
      count: lastDailyStats?.withdrawalVaultETHReceivedCount,
      id: WITHDRAWAL_VAULT_RECEIVED_STAT_ID,
      value: lastDailyStats?.withdrawalVaultETHReceivedAmount,
    },
    [REWARDS_VAULT_RECEIVED_STAT_ID]: {
      count: lastDailyStats?.rewardsVaultETHReceivedCount,
      id: REWARDS_VAULT_RECEIVED_STAT_ID,
      value: lastDailyStats?.rewardsVaultETHReceivedAmount,
    },
  };
}

export function useLidoLastDailyStatsData() {
  const queryResult = useLidoServerQuery(GET_LIDO_SERVER_LAST_DAILY_STATS);
  const queryData = queryResult.data || queryResult.previousData;
  const lastDailyStats = queryData?.lidoDailyStats?.items?.[0];

  return {
    ...queryResult,
    data: getLastDailyProtocolStatsData(lastDailyStats),
  };
}

export function useLidoStEthHolderCountData() {
  const queryResult = useLidoServerQuery(GET_LIDO_SERVER_STETH_TOTALS);
  const total = queryResult.data?.stethHolders?.total;

  return {
    ...queryResult,
    data: {
      count: total,
      value: total,
    },
  };
}

export function useLidoWstEthHolderCountData() {
  const queryResult = useLidoServerQuery(GET_LIDO_SERVER_WSTETH_TOTALS);
  const total = queryResult.data?.wstethHolders?.total;

  return {
    ...queryResult,
    data: {
      count: total,
      value: total,
    },
  };
}
