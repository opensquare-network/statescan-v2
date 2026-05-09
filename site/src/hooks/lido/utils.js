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

  if (value == null || tieBreaker == null) {
    return null;
  }

  return [value, tieBreaker].join(CURSOR_SEPARATOR);
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

export function getTimeDimensionFilter({
  timeDimension,
  blockStart,
  blockEnd,
  dateStart,
  dateEnd,
}) {
  if (timeDimension === "date") {
    return {
      ...(dateStart ? { blockTime_gte: toSecondsTimestamp(dateStart) } : {}),
      ...(dateEnd ? { blockTime_lte: toSecondsTimestamp(dateEnd) } : {}),
    };
  }

  return {
    ...(blockStart ? { blockNumber_gte: blockStart } : {}),
    ...(blockEnd ? { blockNumber_lte: blockEnd } : {}),
  };
}
