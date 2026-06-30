import { GET_LIDO_OPERATOR_FEE_DISTRIBUTEDS } from "../../services/gql/lido";
import { useLidoServerListQuery } from "./useLidoList";
import { useLidoServerIndexerFilterVariables } from "./useLidoListVariables";

export function useLidoOperatorFeeDistributedsData(nodeOperatorId) {
  const queryVariables = {};
  if (nodeOperatorId) {
    queryVariables.nodeOperatorId = Number(nodeOperatorId);
  }

  const variables = useLidoServerIndexerFilterVariables({
    variables: queryVariables,
  });

  return useLidoServerListQuery({
    query: GET_LIDO_OPERATOR_FEE_DISTRIBUTEDS,
    field: "operatorFeeDistributeds",
    variables,
  });
}
