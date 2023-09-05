import { useEffect, useState } from "react";
import { useQueryParams } from "../../hooks/useQueryParams";
import SearchIcon from "../../components/icons/searchIcon";

export function useIdentitiesFilter() {
  const [filter, setFilter] = useState([]);
  const { search = "", includeSubIdentities } = useQueryParams();

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

    const showSubIdentityFilter = {
      value: includeSubIdentities ?? true,
      type: "checkbox",
      name: "Show Sub Identity",
      query: "includeSubIdentities",
    };

    setFilter([searchFilter, { type: "divider" }, showSubIdentityFilter]);
  }, [search, includeSubIdentities]);

  return filter;
}
