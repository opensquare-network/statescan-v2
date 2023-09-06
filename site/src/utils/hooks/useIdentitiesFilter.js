import { useEffect, useState } from "react";
import { useQueryParams } from "../../hooks/useQueryParams";
import SearchIcon from "../../components/icons/searchIcon";
import { IDENTITY_TYPE } from "../constants";
import capitalize from "lodash.capitalize";
import toUpper from "lodash.toupper";

export function useIdentitiesFilter() {
  const [filter, setFilter] = useState([]);
  const { search = "", identityType } = useQueryParams();

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

    const identityTypeFilter = {
      value: identityType,
      name: "Identity Type",
      query: "identityType",
      options: [
        { text: "All", value: undefined },
        { type: "divider" },
        ...[IDENTITY_TYPE.DIRECT, IDENTITY_TYPE.SUB].map((type) => ({
          text: capitalize(type),
          value: toUpper(type),
        })),
      ],
    };

    setFilter([searchFilter, { type: "divider" }, identityTypeFilter]);
  }, [search, identityType]);

  return filter;
}
