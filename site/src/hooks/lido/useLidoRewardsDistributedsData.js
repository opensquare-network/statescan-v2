import { GET_LIDO_REWARDS_DISTRIBUTEDS } from "../../services/gql/lido";
import { useLidoServerListQuery } from "./useLidoList";
import { useLidoServerIndexerFilterVariables } from "./useLidoListVariables";

export function useLidoRewardsDistributedsData(
  stakingModuleId,
  nodeOperatorId,
) {
  const variables = useLidoServerIndexerFilterVariables({
    variables: {
      stakingModuleId: Number(stakingModuleId),
      nodeOperatorId: Number(nodeOperatorId),
    },
  });

  return useLidoServerListQuery({
    query: GET_LIDO_REWARDS_DISTRIBUTEDS,
    field: "rewardsDistributeds",
    variables,
    skip: !stakingModuleId || !nodeOperatorId,
  });
}
