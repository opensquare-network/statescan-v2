import { GET_LIDO_DEPOSITS } from "../../services/gql/lido";
import { useLidoServerQuery } from "./useLidoQuery";
import { useLidoListQueryParams } from "./useLidoListQueryParams";
import {
  getLidoServerIndexerFilter,
  useLidoServerListVariables,
} from "./useLidoListVariables";

export function useLidoDepositsData() {
  const { txHash, timeDimensionParams } = useLidoListQueryParams();
  const variables = useLidoServerListVariables({
    variables: {
      filter: getLidoServerIndexerFilter({ txHash, timeDimensionParams }),
    },
  });
  const queryResult = useLidoServerQuery(GET_LIDO_DEPOSITS, {
    variables,
  });

  return {
    ...queryResult,
    data: queryResult.data?.deposits,
  };
}
