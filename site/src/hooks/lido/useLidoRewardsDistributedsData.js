import { TABLE_SORT_QUERY_KEY } from "../../utils/constants";
import { GET_LIDO_REWARDS_DISTRIBUTEDS } from "../../services/gql/lido";
import { useQueryParams } from "../useQueryParams";
import { useLidoListVariables } from "./useLidoListVariables";
import { useLidoStakingRouterQuery } from "./useLidoQuery";
import { toLidoListQueryResult } from "./utils";

export function useLidoRewardsDistributedsData(
  stakingModuleId,
  nodeOperatorId,
) {
  const { cursor, [TABLE_SORT_QUERY_KEY]: sortQuery } = useQueryParams({
    parseNumbers: false,
  });
  const { variables, pageSize } = useLidoListVariables({
    sortQuery,
    cursor,
    where: {
      stakingModuleId: String(stakingModuleId),
      nodeOperatorId: String(nodeOperatorId),
    },
    timeDimensionParams: {},
  });

  const queryResult = useLidoStakingRouterQuery(GET_LIDO_REWARDS_DISTRIBUTEDS, {
    variables,
    skip: !stakingModuleId || !nodeOperatorId,
  });

  return toLidoListQueryResult(
    queryResult,
    "rewardsDistributeds",
    pageSize,
    variables.orderBy,
  );
}
