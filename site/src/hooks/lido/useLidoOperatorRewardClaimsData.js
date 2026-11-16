import { GET_LIDO_OPERATOR_REWARD_CLAIMS } from "../../services/gql/lido";
import { useLidoServerListQuery } from "./useLidoList";
import { useLidoServerFilterVariables } from "./useLidoListVariables";

export function useLidoOperatorRewardClaimsData(nodeOperatorId) {
  const queryVariables = {};
  if (nodeOperatorId) {
    queryVariables.nodeOperatorId = Number(nodeOperatorId);
  }

  const variables = useLidoServerFilterVariables({
    variables: queryVariables,
    withSort: true,
    defaultSortQuery: "block_desc",
  });

  return useLidoServerListQuery({
    query: GET_LIDO_OPERATOR_REWARD_CLAIMS,
    field: "operatorRewardClaims",
    variables,
  });
}
