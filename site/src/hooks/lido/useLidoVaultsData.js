import last from "lodash.last";
import { GET_LIDO_VAULTS } from "../../services/gql/lido";
import { useQueryParams } from "../useQueryParams";
import { useLidoQuery } from "./useLidoQuery";
import { useLidoListVariables } from "./useLidoListVariables";
import { encodeCursor } from "./utils";

const DEFAULT_SORT = "statusOrder_asc";

export function useLidoVaultsData() {
  const {
    cursor,
    vault = "",
    operator = "",
    status: statusQuery = "",
  } = useQueryParams({ parseNumbers: false });
  const status = statusQuery === "null" ? "" : statusQuery;
  const { variables, pageSize } = useLidoListVariables({
    sortQuery: DEFAULT_SORT,
    cursor,
    where: {
      ...(vault ? { id_contains_nocase: String(vault) } : {}),
      ...(operator ? { nodeOperator_contains_nocase: String(operator) } : {}),
      ...(status ? { status } : {}),
    },
    timeDimensionParams: {},
  });

  const queryResult = useLidoQuery(GET_LIDO_VAULTS, { variables });

  const queryData = queryResult.data || queryResult.previousData;
  const items = queryData?.vaults || [];
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
