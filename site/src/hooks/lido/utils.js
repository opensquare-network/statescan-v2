import isNil from "lodash.isnil";
import omit from "lodash.omit";

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
