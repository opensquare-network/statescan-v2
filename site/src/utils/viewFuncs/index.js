import * as queryString from "query-string";
import BigNumber from "bignumber.js";
import { setErrorCode } from "../../store/reducers/httpErrorSlice";

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

export function toPrecision(value, decimals) {
  return new BigNumber(value).dividedBy(Math.pow(10, decimals)).toString();
}

export function getEffectiveNumbers(n) {
  const result = [];
  let flag = false;
  n.toString()
    .split("")
    .reverse()
    .forEach((dig) => {
      if (!isNaN(parseInt(dig))) {
        flag = flag || parseInt(dig) > 0;
        flag && result.push(dig);
      }
    });
  return result.reverse().join();
}

export function abbreviateBigNumber(x, fixed = 2) {
  const n = new BigNumber(x);
  const fmt = {
    decimalSeparator: ".",
    groupSeparator: ",",
    groupSize: 3,
  };
  let divideBy = new BigNumber("1");
  const bigNumbers = [
    { bigNumber: new BigNumber("1000"), abbr: "K" },
    { bigNumber: new BigNumber("1000000"), abbr: "M" },
    { bigNumber: new BigNumber("1000000000"), abbr: "B" },
    { bigNumber: new BigNumber("1000000000000"), abbr: "T" },
    { bigNumber: new BigNumber("1000000000000000"), abbr: "Q" },
  ];
  bigNumbers.forEach((data) => {
    if (n.isGreaterThan(data.bigNumber)) {
      divideBy = data.bigNumber;
      fmt.suffix = data.abbr;
    }
  });
  BigNumber.config({ FORMAT: fmt });
  return new BigNumber(n.dividedBy(divideBy).toFixed(fixed)).toFormat();
}

export function bigNumberToLocaleString(n) {
  const x = new BigNumber(n);
  return x.toFormat();
}

export function handleApiError(e, dispatch) {
  if (e?.error?.status === 204 || e?.error?.status === 404) {
    dispatch(setErrorCode(404));
  } else {
    dispatch(setErrorCode(500));
  }
}

export function clearHttpError(dispatch) {
  dispatch && dispatch(setErrorCode(null));
}

export function isHash(term = "") {
  return /^0x[0-9a-f]{64}$/.test(term);
}
