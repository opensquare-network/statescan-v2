import { GET_LIDO_MODULE_REWARDS } from "../../services/gql/lido";
import { useLidoStakingRouterQuery } from "./useLidoQuery";
import { useLidoListVariables } from "./useLidoListVariables";
import { useLidoListQueryParams } from "./useLidoListQueryParams";
import { toLidoListQueryResult } from "./utils";

export function useLidoModuleRewardsData(fixedStakingModuleId) {
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

  const queryResult = useLidoStakingRouterQuery(GET_LIDO_MODULE_REWARDS, {
    variables,
  });

  return toLidoListQueryResult(
    queryResult,
    "stETHSharesTransfers",
    pageSize,
    variables.orderBy,
  );
}
