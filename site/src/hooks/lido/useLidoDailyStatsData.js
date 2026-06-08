import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import BigNumber from "bignumber.js";
import {
  GET_LIDO_DAILY_STATS,
  GET_LIDO_SERVER_STETH_DAILY_STATS,
  GET_LIDO_SERVER_WSTETH_DAILY_STATS,
  GET_LIDO_STETH_DAILY_STATS_ANALYTICS,
  GET_LIDO_WSTETH_DAILY_STATS_ANALYTICS,
} from "../../services/gql/lido";
import { fetchLidoDailyStatsHolders } from "./fetchLidoDailyStatsHolders";
import { lidoClient, useLidoQuery, useLidoServerQuery } from "./useLidoQuery";

const DAYS = 30;
const ANALYTICS_HOLDER_STATS_SIZE = 1000;

const emptySummary = {
  depositCount: 0,
  depositValue: 0,
  withdrawalRequestCount: 0,
  withdrawalRequestValue: 0,
};

function sumBy(items, field) {
  return items
    .reduce((result, item) => {
      return result.plus(item[field] || 0);
    }, new BigNumber(0))
    .toString();
}

function sumStats(items = []) {
  return Object.keys(emptySummary).reduce((result, field) => {
    return {
      ...result,
      [field]: sumBy(items, field),
    };
  }, {});
}

function getRecentStats(items = [], days) {
  return sumStats(items.slice(-days));
}

export function useLidoDailyStatsData() {
  const queryResult = useLidoQuery(GET_LIDO_DAILY_STATS, {
    variables: {
      first: DAYS,
      orderBy: "timestamp",
      orderDirection: "desc",
    },
  });
  const queryData = queryResult.data || queryResult.previousData;

  const data = useMemo(() => {
    const items = [...(queryData?.dailyStats || [])].reverse();

    return {
      last7Days: getRecentStats(items, 7),
      last30Days: getRecentStats(items, 30),
    };
  }, [queryData?.dailyStats]);

  return {
    ...queryResult,
    data,
  };
}

const tokenConfigs = {
  stETH: {
    query: GET_LIDO_STETH_DAILY_STATS_ANALYTICS,
    serverQuery: GET_LIDO_SERVER_STETH_DAILY_STATS,
    serverField: "stethDailyStats",
    holdersField: "stETHHolderCount",
    totalSupplyField: "stETHTotalSupply",
  },
  wstETH: {
    query: GET_LIDO_WSTETH_DAILY_STATS_ANALYTICS,
    serverQuery: GET_LIDO_SERVER_WSTETH_DAILY_STATS,
    serverField: "wstethDailyStats",
    holdersField: "wstETHHolderCount",
    totalSupplyField: "wstETHTotalSupply",
  },
};

function formatHolderStats(holderStats = [], holdersField) {
  return [...holderStats]
    .sort((a, b) => {
      return Number(a.timestamp || 0) - Number(b.timestamp || 0);
    })
    .map((item) => {
      return {
        timestamp: item.timestamp,
        [holdersField]: item[holdersField] ?? null,
      };
    });
}

function formatSupplyStats(supplyStats = []) {
  return [...supplyStats]
    .sort((a, b) => {
      return Number(a.timestamp || 0) - Number(b.timestamp || 0);
    })
    .map((item) => {
      return {
        timestamp: item.timestamp,
        totalSupply: item.totalSupply ?? null,
      };
    });
}

function mergeStats(holderStats, supplyStats, totalSupplyField) {
  return holderStats.map((item, index) => {
    return {
      ...item,
      [totalSupplyField]: supplyStats[index]?.totalSupply ?? null,
    };
  });
}

function useLidoDailyStatsHoldersData({ token, query }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const cacheRef = useRef({ token: null, data: [] });

  const fetchData = useCallback(async () => {
    if (token === cacheRef.current.token) {
      setData(cacheRef.current.data);
      return;
    }

    setLoading(true);

    try {
      const items = await fetchLidoDailyStatsHolders({
        client: lidoClient,
        query,
        pageSize: ANALYTICS_HOLDER_STATS_SIZE,
      });

      cacheRef.current = { token, data: items };
      setData(items);
    } catch (e) {
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [query, token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
  };
}

export function useLidoDailyStatsAnalyticsData(token) {
  const config = tokenConfigs[token];
  const holdersQueryResult = useLidoDailyStatsHoldersData({
    token,
    query: config.query,
  });
  const serverQueryResult = useLidoServerQuery(config.serverQuery);
  const serverQueryData =
    serverQueryResult.data || serverQueryResult.previousData;
  const supplyStats = serverQueryData?.[config.serverField];
  const data = useMemo(() => {
    const formattedHolderStats = formatHolderStats(
      holdersQueryResult.data,
      config.holdersField,
    );
    const formattedSupplyStats = formatSupplyStats(supplyStats);

    return mergeStats(
      formattedHolderStats,
      formattedSupplyStats,
      config.totalSupplyField,
    );
  }, [
    config.holdersField,
    config.totalSupplyField,
    holdersQueryResult.data,
    supplyStats,
  ]);

  return {
    ...serverQueryResult,
    loading: serverQueryResult.loading || holdersQueryResult.loading,
    data,
  };
}
