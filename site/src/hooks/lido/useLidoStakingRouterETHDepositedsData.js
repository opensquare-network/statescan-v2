import { GET_LIDO_STAKING_ROUTER_ETH_DEPOSITEDS } from "../../services/gql/lido";
import { useLidoStakingRouterQuery } from "./useLidoQuery";
import { useLidoListVariables } from "./useLidoListVariables";
import { useLidoListQueryParams } from "./useLidoListQueryParams";
import { toLidoListQueryResult } from "./utils";

export function useLidoStakingRouterETHDepositedsData(fixedStakingModuleId) {
  const {
    cursor,
    sortQuery,
    txHash,
    params: { stakingModuleId = "" },
    timeDimensionParams,
  } = useLidoListQueryParams();
  const moduleId = fixedStakingModuleId || stakingModuleId;
  const { variables, pageSize } = useLidoListVariables({
    sortQuery,
    cursor,
    where: {
      ...(moduleId ? { stakingModuleId: String(moduleId) } : {}),
      ...(txHash ? { txHash } : {}),
    },
    timeDimensionParams,
  });

  const queryResult = useLidoStakingRouterQuery(
    GET_LIDO_STAKING_ROUTER_ETH_DEPOSITEDS,
    { variables },
  );

  return toLidoListQueryResult(
    queryResult,
    "stakingRouterETHDepositeds",
    pageSize,
    variables.orderBy,
  );
}
