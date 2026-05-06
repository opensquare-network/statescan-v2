import { useMemo } from "react";
import {
  getCursorFilter,
  getSort,
  getTimeDimensionFilter,
  LIDO_LIST_PAGE_SIZE,
  mergeCursorFilter,
} from "./utils";

export function useLidoListVariables({
  sortQuery,
  cursor,
  where,
  timeDimensionParams,
}) {
  const pageSize = LIDO_LIST_PAGE_SIZE;

  const variables = useMemo(() => {
    const sort = getSort(sortQuery);
    const baseFilters = {
      ...where,
      ...getTimeDimensionFilter(timeDimensionParams),
    };
    const cursorFilter = getCursorFilter(
      cursor,
      sort.orderBy,
      sort.orderDirection,
    );
    const filters = mergeCursorFilter(baseFilters, cursorFilter);

    return {
      first: pageSize,
      ...sort,
      ...(Object.keys(filters).length ? { where: filters } : {}),
    };
  }, [cursor, pageSize, sortQuery, timeDimensionParams, where]);

  return { variables, pageSize };
}
