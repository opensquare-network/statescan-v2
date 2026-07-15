import {
  GET_LIDO_SERVER_STETH_DAILY_STATS,
  GET_LIDO_SERVER_USER_STAKING_STATS,
  GET_LIDO_SERVER_WSTETH_DAILY_STATS,
} from "../../services/gql/lido";
import { useMemo } from "react";
import { useLidoServerQuery } from "./useLidoQuery";

function getUserStakingStatsData(stats) {
  return {
    depositCount: stats?.deposits?.count ?? null,
    depositValue: stats?.deposits?.amount ?? null,
    withdrawalRequestCount: stats?.withdrawals?.count ?? null,
    withdrawalRequestValue: stats?.withdrawals?.amount ?? null,
  };
}

export function useLidoDailyStatsData() {
  const last7DaysQueryResult = useLidoServerQuery(
    GET_LIDO_SERVER_USER_STAKING_STATS,
    {
      variables: { days: 7 },
    },
  );
  const last30DaysQueryResult = useLidoServerQuery(
    GET_LIDO_SERVER_USER_STAKING_STATS,
    {
      variables: { days: 30 },
    },
  );
  const last7DaysData =
    last7DaysQueryResult.data || last7DaysQueryResult.previousData;
  const last30DaysData =
    last30DaysQueryResult.data || last30DaysQueryResult.previousData;

  return {
    data: {
      last7Days: getUserStakingStatsData(last7DaysData?.userStakingStats),
      last30Days: getUserStakingStatsData(last30DaysData?.userStakingStats),
    },
    error: last7DaysQueryResult.error || last30DaysQueryResult.error,
    loading: last7DaysQueryResult.loading || last30DaysQueryResult.loading,
  };
}

const tokenConfigs = {
  stETH: {
    serverQuery: GET_LIDO_SERVER_STETH_DAILY_STATS,
    serverField: "stEthDailyStats",
    holdersField: "stethHolders",
    sharesField: "stethShares",
    supplyField: "stethSupply",
  },
  wstETH: {
    serverQuery: GET_LIDO_SERVER_WSTETH_DAILY_STATS,
    serverField: "wstEthDailyStats",
    holdersField: "wstethHolders",
    supplyField: "wstethSupply",
  },
};

function toLidoDailyStatTimestamp(date) {
  if (!date) {
    return null;
  }

  const timestamp = Date.parse(`${date}T00:00:00Z`);

  if (Number.isNaN(timestamp)) {
    return null;
  }

  return Math.floor(timestamp / 1000);
}

function formatServerDailyStats(items = [], config) {
  return items
    .map((item) => {
      return {
        holders: item[config.holdersField] ?? null,
        shares: config.sharesField ? item[config.sharesField] ?? null : null,
        timestamp: toLidoDailyStatTimestamp(item.date),
        totalSupply: item[config.supplyField] ?? null,
      };
    })
    .filter((item) => item.timestamp)
    .sort((a, b) => {
      return a.timestamp - b.timestamp;
    });
}

export function useLidoDailyStatsAnalyticsData(token) {
  const config = tokenConfigs[token];
  const serverQueryResult = useLidoServerQuery(config.serverQuery);
  const serverQueryData =
    serverQueryResult.data || serverQueryResult.previousData;
  const serverStats = serverQueryData?.[config.serverField];
  const data = useMemo(() => {
    return formatServerDailyStats(serverStats, config);
  }, [config, serverStats]);

  return {
    ...serverQueryResult,
    data,
  };
}
