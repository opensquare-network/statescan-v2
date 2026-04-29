import { useMemo, useState } from "react";
import { LIST_DEFAULT_PAGE_SIZE } from "../../utils/constants";
import { useQueryParams } from "../useQueryParams";
import { GET_LIDO_DEPOSITS } from "../../services/gql/lido";
import { useLidoQuery } from "./useLidoQuery";
import { getLidoListPageData } from "./pagination";

const DEFAULT_ORDER_BY = "blockNumber";
const DEFAULT_ORDER_DIRECTION = "desc";

export function useLidoDepositsData() {
  const [data, setData] = useState(null);
  const queryParams = useQueryParams();
  const {
    page = 1,
    sort,
    address,
    txHash,
  } = queryParams;
  const pageSize = LIST_DEFAULT_PAGE_SIZE;
  const currentPage = Math.max(1, Number(page) || 1);

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
      ...(address ? { address_contains_nocase: String(address) } : {}),
      ...(txHash ? { txHash_contains_nocase: String(txHash) } : {}),
    };

    return {
      includeStats: Object.keys(where).length === 0,
      first: pageSize + 1,
      skip: (currentPage - 1) * pageSize,
      where,
      orderBy,
      orderDirection,
    };
  }, [
    address,
    currentPage,
    pageSize,
    sort,
    txHash,
  ]);

  const queryResult = useLidoQuery(GET_LIDO_DEPOSITS, {
    variables,
    onCompleted: setData,
  });
  const tableData = data
    ? getLidoListPageData({
        rawItems: data?.deposits || [],
        page: currentPage,
        pageSize,
        stats: data?.paginationStat,
        statsCountKey: "depositCount",
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
