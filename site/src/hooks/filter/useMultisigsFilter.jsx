import { useEffect, useState } from "react";
import { useQueryParams } from "../useQueryParams";
import SearchIcon from "../../components/icons/searchIcon";
import { MULTISIG_STATUS } from "../../utils/constants";
import capitalize from "lodash.capitalize";

export function useMultisigsFilter() {
  const [filter, setFilter] = useState([]);
  const { account = "", status } = useQueryParams();

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
      value: status ? status.toUpperCase() : "",
      name: "Status",
      query: "status",
      options: [
        { text: "All Status", value: "" },
        { type: "divider" },
        ...[
          MULTISIG_STATUS.APPROVING,
          MULTISIG_STATUS.EXECUTED,
          MULTISIG_STATUS.CANCELLED,
        ].map((value) => ({
          text: capitalize(value),
          value,
        })),
      ],
    };

    setFilter([searchFilter, { type: "divider" }, statusFilter]);
  }, [account, status]);

  return filter;
}
