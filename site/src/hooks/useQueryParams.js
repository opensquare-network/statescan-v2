import { useLocation } from "react-router-dom";
import * as queryString from "query-string";

/**
 * @description Get the search params from the url, shortcut for useLocation().search
 */
export function useQueryParams() {
  const location = useLocation();
  return queryString.parse(location.search, {
    parseNumbers: true,
    parseBooleans: true,
  });
}
