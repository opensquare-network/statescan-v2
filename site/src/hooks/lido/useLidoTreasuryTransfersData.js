import { EMPTY_OBJECT } from "../../utils/constants";
import { GET_LIDO_TREASURY_TRANSFERS } from "../../services/gql/lido";
import { useLidoList } from "./useLidoList";
import { useLidoListQueryParams } from "./useLidoListQueryParams";
import { pickLidoFilters } from "./utils";

export function useLidoTreasuryTransfersData(options = EMPTY_OBJECT) {
  const filters = options.filters || EMPTY_OBJECT;
  const { cursor, txHash, sortQuery, timeDimensionParams } =
    useLidoListQueryParams();

  return useLidoList({
    query: GET_LIDO_TREASURY_TRANSFERS,
    field: "treasuryTransfers",
    sortQuery,
    cursor,
    where: pickLidoFilters({
      txHash: String(filters.txHash ?? txHash ?? ""),
    }),
    timeDimensionParams,
  });
}
