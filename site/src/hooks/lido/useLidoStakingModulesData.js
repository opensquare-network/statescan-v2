import last from "lodash.last";
import { GET_LIDO_STAKING_MODULES } from "../../services/gql/lido";
import { useQueryParams } from "../useQueryParams";
import { useLidoStakingRouterQuery } from "./useLidoQuery";
import { useLidoListVariables } from "./useLidoListVariables";
import { encodeCursor, pickLidoFilters } from "./utils";

const DEFAULT_SORT = "stakingModuleId_asc";

export function useLidoStakingModulesData() {
  const {
    cursor,
    module = "",
    name = "",
    status: statusQuery = "",
  } = useQueryParams({ parseNumbers: false });
  const { variables, pageSize } = useLidoListVariables({
    sortQuery: DEFAULT_SORT,
    cursor,
    where: pickLidoFilters(
      {
        moduleAddress_contains_nocase: module,
        name_contains_nocase: name,
        status: statusQuery,
      },
      { status: Number },
    ),
    timeDimensionParams: {},
  });

  const queryResult = useLidoStakingRouterQuery(GET_LIDO_STAKING_MODULES, {
    variables,
  });

  const queryData = queryResult.data || queryResult.previousData;
  const items = queryData?.stakingModules || [];
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
