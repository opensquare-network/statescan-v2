import * as queryString from "query-string";
import BigNumber from "bignumber.js";

export default function encodeUriQuery(q) {
  return Object.keys(q)
    .map((k) => `${k}=${encodeURIComponent(q[k])}`)
    .join("&");
}

export function getPageFromQuery(location) {
  return parseInt(queryString.parse(location.search)?.page ?? 1);
}

export function getTabFromQuery(location, byDefault = "") {
  return queryString.parse(location.search)?.tab ?? byDefault;
}

export function bigNumberToLocaleString(n) {
  const x = new BigNumber(n);
  return x.toFormat();
}

export function serialize(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}
