import { GET_LIDO_WITHDRAWAL_QUEUE_FINALIZATIONS } from "../../services/gql/lido";
import { useLidoServerQuery } from "./useLidoQuery";
import { pickLidoFilters } from "./utils";
import { useLidoListQueryParams } from "./useLidoListQueryParams";
import {
  getLidoServerIndexerFilter,
  useLidoServerListVariables,
} from "./useLidoListVariables";

export function useLidoWithdrawalQueueFinalizationsData() {
  const { txHash, timeDimensionParams } = useLidoListQueryParams();
  const variables = useLidoServerListVariables({
    variables: pickLidoFilters({
      filter: getLidoServerIndexerFilter({ txHash, timeDimensionParams }),
    }),
  });
  const queryResult = useLidoServerQuery(
    GET_LIDO_WITHDRAWAL_QUEUE_FINALIZATIONS,
    { variables },
  );

  return {
    ...queryResult,
    data: queryResult.data?.withdrawalFinalized,
  };
}
