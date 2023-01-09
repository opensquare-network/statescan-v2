import BigNumber from "bignumber.js";

/**
 * @param {number} number
 * @description wrapped `toLocaleString`
 * @example 123456789 -> 123,456,789
 */
export function currencify(number = 0) {
  return number.toLocaleString();
}

export function isHash(value = "") {
  if (typeof value === "string") {
    return value.startsWith("0x");
  }
  return false;
}

export function hexEllipsis(hex, start = 6, end = 4) {
  return textEllipsis(hex, start, end);
}

export function textEllipsis(text, start, end) {
  if (!text) return;
  if (text.length <= start + end) return text;
  if (!text.slice) return text;
  return `${text.slice(0, start)}...${text.slice(-end)}`;
}

export function makeTablePairs(keys, vals) {
  return {
    object_type: "table_pairs",
    object_data: zip(keys, vals),
  };
}

export function zip(arrLeft, arrRight) {
  return arrLeft.map((val, i) => [val, arrRight[i]]);
}

export function fromAssetUnit(value, decimals) {
  return new BigNumber(value).dividedBy(Math.pow(10, decimals)).toString();
}
