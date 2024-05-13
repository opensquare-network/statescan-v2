import { useEffect, useState } from "react";
import { useQueryParams } from "../useQueryParams";
import SearchIcon from "../../components/icons/searchIcon";

export function useVestingsFilter() {
  const [filter, setFilter] = useState([]);
  const { account = "" } = useQueryParams();

  useEffect(() => {
    const searchFilter = {
      value: account,
      type: "input",
      name: "Search",
      query: "account",
      inputProps: {
        placeholder: "Address",
        prefix: <SearchIcon style={{ width: 16, height: 16 }} />,
      },
    };

    setFilter([searchFilter]);
  }, [account]);

  return filter;
}
