const DEFAULT_ORDER_BY = "blockNumber";
const DEFAULT_ORDER_DIRECTION = "desc";

export function getSort(sort) {
  if (!sort) {
    return {
      orderBy: DEFAULT_ORDER_BY,
      orderDirection: DEFAULT_ORDER_DIRECTION,
    };
  }

  const parts = String(sort).split("_");
  const orderDirection = parts.pop();

  return {
    orderBy: parts.join("_"),
    orderDirection,
  };
}

export function getCursorFilter(cursor, orderDirection) {
  if (!cursor) {
    return {};
  }

  const id = String(cursor);

  return orderDirection === "desc" ? { id_lt: id } : { id_gt: id };
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
