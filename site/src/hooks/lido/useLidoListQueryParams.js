import { isHex } from "@polkadot/util";
import { EMPTY_OBJECT, TABLE_SORT_QUERY_KEY } from "../../utils/constants";
import { useQueryParams } from "../useQueryParams";

function toBytesFilter(value) {
  const trimmed = trimString(value);

  if (!trimmed || !isHex(trimmed)) {
    return "";
  }

  return trimmed;
}

function trimString(value) {
  return String(value || "").trim();
}

export function useLidoListQueryParams() {
  const queryParams = useQueryParams({ parseNumbers: false }) || EMPTY_OBJECT;
  const {
    cursor,
    txHash = "",
    time_dimension: timeDimension = "block",
    block_start: blockStart,
    block_end: blockEnd,
    date_start: dateStart,
    date_end: dateEnd,
    [TABLE_SORT_QUERY_KEY]: sortQuery,
    ...params
  } = queryParams;

  return {
    cursor,
    sortQuery,
    txHash: toBytesFilter(txHash),
    params,
    timeDimensionParams: {
      timeDimension,
      blockStart: trimString(blockStart),
      blockEnd: trimString(blockEnd),
      dateStart: trimString(dateStart),
      dateEnd: trimString(dateEnd),
    },
  };
}
