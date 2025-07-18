import { useEffect, useState, useCallback } from "react";
import { useQueryParams } from "../useQueryParams";
import SearchIcon from "../../components/icons/searchIcon";
import { MULTISIG_STATUS } from "../../utils/constants";
import capitalize from "lodash.capitalize";

export function useMultisigsFilter() {
  const [filter, setFilter] = useState([]);
  const {
    account = "",
    status,
    signatory = "",
    search_type = "account",
  } = useQueryParams();

  const stableSetFilter = useCallback(
    (newFilter) => {
      setFilter(newFilter);
    },
    [setFilter],
  );

  useEffect(() => {
    const searchFilter = {
      value: search_type === "account" ? account : signatory,
      type: "input",
      name: "Address",
      query: search_type === "account" ? "account" : "signatory",
      inputProps: {
        placeholder: search_type === "account" ? "Account" : "Signatory",
        prefix: <SearchIcon style={{ width: 16, height: 16 }} />,
      },
    };

    const searchTypeFilter = {
      value: search_type,
      name: "Address Type",
      query: "search_type",
      options: [
        {
          text: "Account",
          value: "account",
        },
        {
          text: "Signatory",
          value: "signatory",
        },
      ],
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

    stableSetFilter([
      searchTypeFilter,
      searchFilter,
      { type: "divider" },
      statusFilter,
    ]);
  }, [status, search_type, stableSetFilter, account, signatory]);

  return filter;
}
