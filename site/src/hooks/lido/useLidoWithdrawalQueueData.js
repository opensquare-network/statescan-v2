import { GET_LIDO_WITHDRAWAL_QUEUE_FINALIZATIONS } from "../../services/gql/lido";
import { useLidoList } from "./useLidoList";
import { useLidoListQueryParams } from "./useLidoListQueryParams";
import { pickLidoFilters } from "./utils";

export function useLidoWithdrawalQueueFinalizationsData() {
  const { cursor, sortQuery, txHash, timeDimensionParams } =
    useLidoListQueryParams();

  return useLidoList({
    query: GET_LIDO_WITHDRAWAL_QUEUE_FINALIZATIONS,
    field: "withdrawalFinalizations",
    sortQuery,
    cursor,
    where: pickLidoFilters({ txHash }),
    timeDimensionParams,
  });
}
