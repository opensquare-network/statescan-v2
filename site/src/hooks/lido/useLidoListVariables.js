import { useMemo } from "react";
import { LIST_DEFAULT_PAGE_SIZE } from "../../utils/constants";
import { getCursorFilter, getSort, getTimeDimensionFilter } from "./utils";

export function useLidoListVariables({
  sortQuery,
  cursor,
  where,
  timeDimensionParams,
}) {
  const pageSize = LIST_DEFAULT_PAGE_SIZE;

  const variables = useMemo(() => {
    const sort = getSort(sortQuery);
    const filters = {
      ...where,
      ...getTimeDimensionFilter(timeDimensionParams),
      ...getCursorFilter(cursor, sort.orderDirection),
    };

    return {
      first: pageSize,
      ...sort,
      ...(Object.keys(filters).length ? { where: filters } : {}),
    };
  }, [cursor, pageSize, sortQuery, timeDimensionParams, where]);

  return { variables, pageSize };
}
