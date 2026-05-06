import { useMemo } from "react";
import BigNumber from "bignumber.js";
import { GET_LIDO_DAILY_STATS } from "../../services/gql/lido";
import { useLidoQuery } from "./useLidoQuery";

const DAYS = 30;

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
