import { GET_LIDO_SERVER_STAKING_ROUTER_ETH_DEPOSITED } from "../../services/gql/lido";
import { useLidoServerListQuery } from "./useLidoList";
import { useLidoServerIndexerFilterVariables } from "./useLidoListVariables";
import { useLidoListQueryParams } from "./useLidoListQueryParams";
import { pickLidoFilters } from "./utils";

export function useLidoStakingRouterETHDepositedsData(fixedStakingModuleId) {
  const {
    params: { stakingModuleId = "" },
  } = useLidoListQueryParams();
  const moduleId = fixedStakingModuleId || stakingModuleId;
  const variables = useLidoServerIndexerFilterVariables({
    variables: pickLidoFilters({
      stakingModuleId: moduleId ? Number(moduleId) : undefined,
    }),
  });

  return useLidoServerListQuery({
    query: GET_LIDO_SERVER_STAKING_ROUTER_ETH_DEPOSITED,
    field: "stakingRouterEthDeposited",
    variables,
  });
}
