import { useEffect, useState, useCallback } from "react";
import { useQueryParams } from "../useQueryParams";
import SearchIcon from "../../components/icons/searchIcon";
import useChainSettings from "../../utils/hooks/chain/useChainSettings";

export function useValidatorsFilter() {
  const [filter, setFilter] = useState([]);
  const { identity } = useChainSettings();
  const {
    search = "",
    onlyActive = "Yes",
    hasIdentityOnly = identity ? "Yes" : "No",
    no100Commission = "Yes",
  } = useQueryParams();

  const stableSetFilter = useCallback(
    (newFilter) => {
      setFilter(newFilter);
    },
    [setFilter],
  );

  useEffect(() => {
    const searchFilter = {
      value: search,
      type: "input",
      name: "Search",
      query: "search",
      inputProps: {
        placeholder: "Address/Identity...",
        prefix: <SearchIcon style={{ width: 16, height: 16 }} />,
      },
    };

    const activeOnlyFilter = {
      value: onlyActive,
      type: "select",
      name: "Active only",
      query: "onlyActive",
      options: [
        { text: "Yes", value: "Yes" },
        { text: "No", value: "No" },
      ],
    };

    const hasIdentityFilter = {
      value: hasIdentityOnly,
      type: "select",
      name: "Has identity only",
      query: "hasIdentityOnly",
      options: [
        { text: "Yes", value: "Yes" },
        { text: "No", value: "No" },
      ],
    };

    const no100CommissionFilter = {
      value: no100Commission,
      type: "select",
      name: "No 100% commission",
      query: "no100Commission",
      options: [
        { text: "Yes", value: "Yes" },
        { text: "No", value: "No" },
      ],
    };

    stableSetFilter([
      searchFilter,
      { type: "divider" },
      activeOnlyFilter,
      ...(identity ? [hasIdentityFilter] : []),
      no100CommissionFilter,
    ]);
  }, [
    search,
    onlyActive,
    hasIdentityOnly,
    no100Commission,
    identity,
    stableSetFilter,
  ]);

  return filter;
}
