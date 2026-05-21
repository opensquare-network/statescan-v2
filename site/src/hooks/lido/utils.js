import isNil from "lodash.isnil";
import last from "lodash.last";
import omit from "lodash.omit";

export const LIDO_LIST_PAGE_SIZE = 25;
export const LIDO_LIST_ORDER_BY = "blockNumber";
export const LIDO_LIST_ORDER_DIRECTION = "desc";

const CURSOR_SEPARATOR = ":";

function getTieBreakerField(orderBy) {
  return orderBy === "blockNumber" ? "logIndex" : "id";
}

export function encodeCursor(item, orderBy) {
  const value = item?.[orderBy];
  const tieBreaker = item?.[getTieBreakerField(orderBy)];

  if (isNil(value) || isNil(tieBreaker)) {
    return null;
  }

  return [value, tieBreaker].join(CURSOR_SEPARATOR);
}

export function toLidoListQueryResult(
  queryResult,
  rootField,
  pageSize,
  orderBy,
) {
  const queryData = queryResult.data || queryResult.previousData;
  const items = queryData?.[rootField] || [];
  const hasNextPage = items.length === pageSize;
  const nextCursor = hasNextPage ? encodeCursor(last(items), orderBy) : null;

  return {
    ...queryResult,
    data: {
      items,
      nextCursor,
    },
  };
}

export function getSort(sort) {
  if (!sort) {
    return {
      orderBy: LIDO_LIST_ORDER_BY,
      orderDirection: LIDO_LIST_ORDER_DIRECTION,
    };
  }

  const parts = String(sort).split("_");
  const orderDirection = parts.pop();

  return {
    orderBy: parts.join("_"),
    orderDirection,
  };
}

function decodeCursor(cursor) {
  const [value, tieBreaker] = String(cursor).split(CURSOR_SEPARATOR);

  if (!value || !tieBreaker) {
    return null;
  }

  return { value, tieBreaker };
}

export function getCursorFilter(cursor, orderBy, orderDirection) {
  if (!cursor) {
    return {};
  }

  const decodedCursor = decodeCursor(cursor);

  if (!decodedCursor) {
    return {};
  }

  const { value: rawValue, tieBreaker } = decodedCursor;
  const value = orderBy === "statusOrder" ? Number(rawValue) : rawValue;
  const operator = orderDirection === "asc" ? "gt" : "lt";
  const tieBreakerField = getTieBreakerField(orderBy);

  return {
    or: [
      { [`${orderBy}_${operator}`]: value },
      { [orderBy]: value, [`${tieBreakerField}_${operator}`]: tieBreaker },
    ],
  };
}

export function mergeCursorFilter(baseFilters, cursorFilter) {
  if (!cursorFilter.or) {
    return baseFilters;
  }

  return {
    or: cursorFilter.or.map((item) => ({ ...baseFilters, ...item })),
  };
}

export function toSecondsTimestamp(timestamp) {
  return Math.floor(Number(timestamp) / 1000);
}

function isEmptyFilterValue(value) {
  return isNil(value) || value === "";
}

export function pickLidoFilters(filters, formatters = {}) {
  const emptyKeys = Object.entries(filters)
    .filter(([, value]) => isEmptyFilterValue(value))
    .map(([key]) => key);

  return Object.fromEntries(
    Object.entries(omit(filters, emptyKeys)).map(([key, value]) => {
      const formatter = formatters[key];

      return [key, formatter ? formatter(value) : value];
    }),
  );
}

export function getTimeDimensionFilter({
  timeDimension,
  blockStart,
  blockEnd,
  dateStart,
  dateEnd,
}) {
  if (timeDimension === "date") {
    return pickLidoFilters(
      {
        blockTime_gte: dateStart,
        blockTime_lte: dateEnd,
      },
      {
        blockTime_gte: toSecondsTimestamp,
        blockTime_lte: toSecondsTimestamp,
      },
    );
  }

  return pickLidoFilters({
    blockNumber_gte: blockStart,
    blockNumber_lte: blockEnd,
  });
}
