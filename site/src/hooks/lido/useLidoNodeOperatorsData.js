import last from "lodash.last";
import { GET_LIDO_NODE_OPERATORS } from "../../services/gql/lido";
import { useQueryParams } from "../useQueryParams";
import { useLidoListVariables } from "./useLidoListVariables";
import { useLidoQuery } from "./useLidoQuery";
import { encodeCursor } from "./utils";

const DEFAULT_SORT = "nodeOperatorId_asc";

export function useLidoNodeOperatorsData(stakingModuleId) {
  const { cursor } = useQueryParams({ parseNumbers: false });
  const { variables, pageSize } = useLidoListVariables({
    sortQuery: DEFAULT_SORT,
    cursor,
    where: {
      ...(stakingModuleId
        ? {
            stakingModuleId: String(stakingModuleId),
          }
        : {}),
    },
    timeDimensionParams: {},
  });

  const queryResult = useLidoQuery(GET_LIDO_NODE_OPERATORS, {
    variables,
    skip: !stakingModuleId,
  });

  const queryData = queryResult.data || queryResult.previousData;
  const items = queryData?.nodeOperators || [];
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
