import { EMPTY_OBJECT } from "../../utils/constants";
import { GET_LIDO_WITHDRAWAL_REQUESTS } from "../../services/gql/lido";
import { useLidoList } from "./useLidoList";
import { useLidoListQueryParams } from "./useLidoListQueryParams";
import { pickLidoFilters } from "./utils";

export function useLidoWithdrawalsData(options = EMPTY_OBJECT) {
  const filters = options.filters || EMPTY_OBJECT;
  const {
    cursor,
    sortQuery,
    txHash,
    params: { status: statusQuery = "" },
    timeDimensionParams,
  } = useLidoListQueryParams();

  const where = pickLidoFilters({
    status: statusQuery,
    status_not: filters.status_not,
    txHash,
  });

  if (filters.address) {
    where.or = [{ owner: filters.address }, { requestor: filters.address }];
  }

  return useLidoList({
    query: GET_LIDO_WITHDRAWAL_REQUESTS,
    field: "withdrawalRequests",
    sortQuery,
    cursor,
    where,
    timeDimensionParams,
  });
}
