import { useMemo } from "react";
import { EMPTY_OBJECT, LIST_DEFAULT_PAGE_SIZE } from "../../utils/constants";
import { useQueryParams } from "../useQueryParams";
import {
  getCursorFilter,
  getSort,
  getTimeDimensionFilter,
  LIDO_LIST_PAGE_SIZE,
  mergeCursorFilter,
  pickLidoFilters,
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

export function getLidoServerIndexerFilter({
  txHash,
  timeDimensionParams = EMPTY_OBJECT,
}) {
  const filter = Object.fromEntries(
    Object.entries(
      pickLidoFilters({
        startBlock: timeDimensionParams.blockStart,
        endBlock: timeDimensionParams.blockEnd,
        startDate: timeDimensionParams.dateStart,
        endDate: timeDimensionParams.dateEnd,
      }),
    )
      .map(([key, value]) => [key, Number(value)])
      .filter(([, value]) => !Number.isNaN(value)),
  );

  Object.assign(filter, pickLidoFilters({ txHash }));

  if (!Object.keys(filter).length) {
    return;
  }

  return {
    timeDimension: timeDimensionParams.timeDimension,
    ...filter,
  };
}

export function useLidoServerListVariables({
  pageSize = LIST_DEFAULT_PAGE_SIZE,
  variables = EMPTY_OBJECT,
} = EMPTY_OBJECT) {
  const { page = 1 } = useQueryParams();

  return {
    limit: pageSize,
    offset: (page - 1) * pageSize,
    ...variables,
  };
}
