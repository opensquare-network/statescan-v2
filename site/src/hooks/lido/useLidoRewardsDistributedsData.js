import { GET_LIDO_REWARDS_DISTRIBUTEDS } from "../../services/gql/lido";
import { useLidoServerListQuery } from "./useLidoList";
import { useLidoServerFilterVariables } from "./useLidoListVariables";

export function useLidoRewardsDistributedsData(
  stakingModuleId,
  nodeOperatorId,
) {
  const variables = useLidoServerFilterVariables({
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
