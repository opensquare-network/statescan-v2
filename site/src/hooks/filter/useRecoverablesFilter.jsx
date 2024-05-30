import { useEffect, useState } from "react";
import SearchIcon from "../../components/icons/searchIcon";
import { useRecoverablesParams } from "../recovery/useRecoverablesParams";
import { RECOVERABLE_STATUS } from "../../utils/constants";

export function useRecoverablesFilter() {
  const [filter, setFilter] = useState([]);
  const { account, status } = useRecoverablesParams();

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

    const statusFilter = {
      value: status,
      name: "Status",
      query: "status",
      options: [
        { text: "All Status", value: null },
        { type: "divider" },
        { text: "Active", value: RECOVERABLE_STATUS.ACTIVE },
        { text: "Inactive", value: RECOVERABLE_STATUS.INACTIVE },
      ],
    };

    setFilter([searchFilter, { type: "divider" }, statusFilter]);
  }, [account, status]);

  return filter;
}
