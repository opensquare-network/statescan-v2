import last from "lodash.last";
import { TABLE_SORT_QUERY_KEY } from "../../utils/constants";
import { GET_LIDO_REWARDS_DISTRIBUTEDS } from "../../services/gql/lido";
import { useQueryParams } from "../useQueryParams";
import { useLidoListVariables } from "./useLidoListVariables";
import { useLidoQuery } from "./useLidoQuery";
import { encodeCursor } from "./utils";

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

  const queryResult = useLidoQuery(GET_LIDO_REWARDS_DISTRIBUTEDS, {
    variables,
    skip: !stakingModuleId || !nodeOperatorId,
  });

  const queryData = queryResult.data || queryResult.previousData;
  const items = queryData?.rewardsDistributeds || [];
  const hasNextPage = items.length === pageSize;
  const nextCursor = hasNextPage
    ? encodeCursor(last(items), variables.orderBy)
    : null;

  return {
    ...queryResult,
    data: {
      items,
      nextCursor,
    },
  };
}
