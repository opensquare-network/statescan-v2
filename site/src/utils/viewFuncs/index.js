import * as queryString from "query-string";

export function addressEllipsis(address, start = 4, end = 4) {
  if (!address) return;
  if (address.length <= start + end) return address;
  if (!address.slice) return address;
  return `${address.slice(0, start)}...${address.slice(-end)}`;
}

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
