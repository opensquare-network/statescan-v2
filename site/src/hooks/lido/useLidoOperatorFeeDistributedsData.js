import { GET_LIDO_OPERATOR_FEE_DISTRIBUTEDS } from "../../services/gql/lido";
import { useQueryParams } from "../useQueryParams";
import { useLidoListVariables } from "./useLidoListVariables";
import { useLidoStakingRouterQuery } from "./useLidoQuery";
import { toLidoListQueryResult } from "./utils";

export function useLidoOperatorFeeDistributedsData(nodeOperatorId) {
  const where = {};
  if (nodeOperatorId) {
    where.nodeOperatorId = String(nodeOperatorId);
  }

  const { cursor } = useQueryParams({ parseNumbers: false });
  const { variables, pageSize } = useLidoListVariables({
    sortQuery: "blockNumber_desc",
    cursor,
    where,
    timeDimensionParams: {},
  });

  const queryResult = useLidoStakingRouterQuery(
    GET_LIDO_OPERATOR_FEE_DISTRIBUTEDS,
    {
      variables,
    },
  );

  return toLidoListQueryResult(
    queryResult,
    "operatorFeeDistributeds",
    pageSize,
    variables.orderBy,
  );
}
