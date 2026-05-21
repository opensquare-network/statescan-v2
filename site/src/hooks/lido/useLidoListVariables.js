import { useMemo } from "react";
import { EMPTY_OBJECT } from "../../utils/constants";
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
  where = EMPTY_OBJECT,
  timeDimensionParams = EMPTY_OBJECT,
  pageSize,
}) {
  const limit = pageSize ?? LIDO_LIST_PAGE_SIZE;

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
      first: limit,
      ...sort,
      ...(Object.keys(filters).length ? { where: filters } : {}),
    };
  }, [cursor, limit, sortQuery, timeDimensionParams, where]);

  return { variables, pageSize: limit };
}
