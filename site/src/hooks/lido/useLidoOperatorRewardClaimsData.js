import { GET_LIDO_OPERATOR_REWARD_CLAIMS } from "../../services/gql/lido";
import { useLidoServerListQuery } from "./useLidoList";
import { useLidoServerIndexerFilterVariables } from "./useLidoListVariables";

export function useLidoOperatorRewardClaimsData(nodeOperatorId) {
  const queryVariables = {};
  if (nodeOperatorId) {
    queryVariables.nodeOperatorId = Number(nodeOperatorId);
  }

  const variables = useLidoServerIndexerFilterVariables({
    variables: queryVariables,
  });

  return useLidoServerListQuery({
    query: GET_LIDO_OPERATOR_REWARD_CLAIMS,
    field: "operatorRewardClaims",
    variables,
  });
}
