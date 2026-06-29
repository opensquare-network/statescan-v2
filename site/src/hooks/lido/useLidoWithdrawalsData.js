import { GET_LIDO_WITHDRAWALS } from "../../services/gql/lido";
import { useLidoListQueryParams } from "./useLidoListQueryParams";
import { useLidoServerQuery } from "./useLidoQuery";
import { pickLidoFilters } from "./utils";
import {
  getLidoServerIndexerFilter,
  useLidoServerListVariables,
} from "./useLidoListVariables";
import { EMPTY_OBJECT } from "../../utils/constants";

export function useLidoWithdrawalsData(options = EMPTY_OBJECT) {
  const { txHash, timeDimensionParams } = useLidoListQueryParams();
  const variables = useLidoServerListVariables({
    variables: pickLidoFilters({
      status: options.filters?.status,
      filter: getLidoServerIndexerFilter({ txHash, timeDimensionParams }),
    }),
  });
  const queryResult = useLidoServerQuery(GET_LIDO_WITHDRAWALS, {
    variables,
  });

  return {
    ...queryResult,
    data: queryResult.data?.withdrawals,
  };
}
