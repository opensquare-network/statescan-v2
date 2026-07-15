import { GET_LIDO_MODULE_REWARDS } from "../../services/gql/lido";
import { useLidoServerListQuery } from "./useLidoList";
import { useLidoServerFilterVariables } from "./useLidoListVariables";
import { useLidoListQueryParams } from "./useLidoListQueryParams";

export function useLidoModuleRewardsData(fixedStakingModuleId) {
  const {
    params: { stakingModuleId = "" },
  } = useLidoListQueryParams();
  const moduleId = fixedStakingModuleId || stakingModuleId;
  const queryVariables = {};
  if (moduleId) {
    queryVariables.stakingModuleId = Number(moduleId);
  }

  const variables = useLidoServerFilterVariables({
    variables: queryVariables,
    withSort: true,
    defaultSortQuery: "block_desc",
  });

  return useLidoServerListQuery({
    query: GET_LIDO_MODULE_REWARDS,
    field: "stethCsmRewards",
    variables,
  });
}
