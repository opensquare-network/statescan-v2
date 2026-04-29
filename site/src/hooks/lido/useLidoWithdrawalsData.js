import { useMemo, useState } from "react";
import {
  LIDO_WITHDRAWAL_STATUS,
  LIST_DEFAULT_PAGE_SIZE,
} from "../../utils/constants";
import { GET_LIDO_WITHDRAWAL_REQUESTS } from "../../services/gql/lido";
import { useQueryParams } from "../useQueryParams";
import { useLidoQuery } from "./useLidoQuery";
import { getLidoListPageData } from "./pagination";

const DEFAULT_ORDER_BY = "blockNumber";
const DEFAULT_ORDER_DIRECTION = "desc";
const STATUS_COUNT_KEYS = {
  [LIDO_WITHDRAWAL_STATUS.CLAIMED]: "withdrawalClaimCount",
  [LIDO_WITHDRAWAL_STATUS.FINALIZED]: "withdrawalFinalizationCount",
};

export function useLidoWithdrawalsData() {
  const [data, setData] = useState(null);
  const {
    page = 1,
    sort,
    status: statusQuery = "",
    txHash = "",
  } = useQueryParams();
  const pageSize = LIST_DEFAULT_PAGE_SIZE;
  const currentPage = Math.max(1, Number(page) || 1);
  const status = statusQuery === "null" ? "" : statusQuery;

  const variables = useMemo(() => {
    let orderBy = DEFAULT_ORDER_BY;
    let orderDirection = DEFAULT_ORDER_DIRECTION;
    if (sort) {
      const parts = String(sort).split("_");
      if (parts.length >= 2) {
        orderDirection = parts.pop();
        orderBy = parts.join("_");
      }
    }

    const where = {
      ...(status ? { status } : {}),
      ...(txHash ? { txHash_contains_nocase: String(txHash) } : {}),
    };

    return {
      includeStats: !txHash,
      first: pageSize + 1,
      skip: (currentPage - 1) * pageSize,
      where,
      orderBy,
      orderDirection,
    };
  }, [currentPage, pageSize, sort, status, txHash]);

  const queryResult = useLidoQuery(GET_LIDO_WITHDRAWAL_REQUESTS, {
    variables,
    onCompleted: setData,
  });
  const statsCountKey = STATUS_COUNT_KEYS[status] || "withdrawalRequestCount";
  const tableData = data
    ? getLidoListPageData({
        rawItems: data?.withdrawalRequests || [],
        page: currentPage,
        pageSize,
        stats: data?.paginationStat,
        statsCountKey,
      })
    : null;

  return {
    ...queryResult,
    data: tableData || {
      page: currentPage,
      pageSize,
    },
    variables,
  };
}
