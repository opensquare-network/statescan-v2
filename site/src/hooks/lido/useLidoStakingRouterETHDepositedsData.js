import { TABLE_SORT_QUERY_KEY } from "../../utils/constants";
import { GET_LIDO_STAKING_ROUTER_ETH_DEPOSITEDS } from "../../services/gql/lido";
import { useQueryParams } from "../useQueryParams";
import { useLidoStakingRouterQuery } from "./useLidoStakingRouterQuery";
import { useLidoListVariables } from "./useLidoListVariables";
import { toLidoListQueryResult } from "./utils";

export function useLidoStakingRouterETHDepositedsData(fixedStakingModuleId) {
  const {
    cursor,
    stakingModuleId = "",
    txHash = "",
    time_dimension: timeDimension = "block",
    block_start: blockStart,
    block_end: blockEnd,
    date_start: dateStart,
    date_end: dateEnd,
    [TABLE_SORT_QUERY_KEY]: sortQuery,
  } = useQueryParams({ parseNumbers: false });
  const moduleId = fixedStakingModuleId || stakingModuleId;
  const { variables, pageSize } = useLidoListVariables({
    sortQuery,
    cursor,
    where: {
      ...(moduleId ? { stakingModuleId: String(moduleId) } : {}),
      ...(txHash ? { txHash } : {}),
    },
    timeDimensionParams: {
      timeDimension,
      blockStart,
      blockEnd,
      dateStart,
      dateEnd,
    },
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
