import isNil from "lodash.isnil";
import omit from "lodash.omit";

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
