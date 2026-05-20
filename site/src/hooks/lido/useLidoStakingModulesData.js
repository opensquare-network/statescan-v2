import last from "lodash.last";
import { GET_LIDO_STAKING_MODULES } from "../../services/gql/lido";
import { useQueryParams } from "../useQueryParams";
import { useLidoStakingRouterQuery } from "./useLidoStakingRouterQuery";
import { useLidoListVariables } from "./useLidoListVariables";
import { encodeCursor } from "./utils";

const DEFAULT_SORT = "stakingModuleId_asc";

export function useLidoStakingModulesData() {
  const {
    cursor,
    module = "",
    name = "",
    status: statusQuery = "",
  } = useQueryParams({ parseNumbers: false });
  const status = statusQuery === "null" ? "" : statusQuery;
  const { variables, pageSize } = useLidoListVariables({
    sortQuery: DEFAULT_SORT,
    cursor,
    where: {
      ...(module ? { moduleAddress_contains_nocase: String(module) } : {}),
      ...(name ? { name_contains_nocase: String(name) } : {}),
      ...(status !== "" ? { status: Number(status) } : {}),
    },
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
