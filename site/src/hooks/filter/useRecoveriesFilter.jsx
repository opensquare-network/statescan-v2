import { useEffect, useState } from "react";
import SearchIcon from "../../components/icons/searchIcon";
import { useRecoverablesParams } from "../recovery/useRecoverablesParams";
import { RECOVERY_STATUS } from "../../utils/constants";
import capitalize from "lodash.capitalize";

export function useRecoveriesFilter() {
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
        {
          text: capitalize(RECOVERY_STATUS.ACTIVE),
          value: RECOVERY_STATUS.ACTIVE,
        },
        {
          text: capitalize(RECOVERY_STATUS.CLOSED),
          value: RECOVERY_STATUS.CLOSED,
        },
      ],
    };

    setFilter([searchFilter, { type: "divider" }, statusFilter]);
  }, [account, status]);

  return filter;
}
