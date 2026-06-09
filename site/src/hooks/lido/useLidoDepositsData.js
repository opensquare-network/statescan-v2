import { EMPTY_OBJECT } from "../../utils/constants";
import { GET_LIDO_DEPOSITS } from "../../services/gql/lido";
import { useLidoList } from "./useLidoList";
import { useLidoListQueryParams } from "./useLidoListQueryParams";
import { pickLidoFilters } from "./utils";

export function useLidoDepositsData(options = EMPTY_OBJECT) {
  const filters = options.filters || EMPTY_OBJECT;
  const {
    cursor,
    txHash,
    sortQuery,
    params: { address },
    timeDimensionParams,
  } = useLidoListQueryParams();

  return useLidoList({
    query: GET_LIDO_DEPOSITS,
    field: "deposits",
    sortQuery,
    cursor,
    where: pickLidoFilters({
      address: String(filters.address ?? address ?? ""),
      txHash,
    }),
    timeDimensionParams,
  });
}
