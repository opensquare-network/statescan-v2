import { useEffect, useState, useCallback } from "react";
import { useQueryParams } from "../useQueryParams";
import SearchIcon from "../../components/icons/searchIcon";
import { MULTISIG_STATUS } from "../../utils/constants";
import capitalize from "lodash.capitalize";

export function useMultisigsFilter() {
  const [filter, setFilter] = useState([]);
  const { address = "", status, address_type = "account" } = useQueryParams();

  const stableSetFilter = useCallback(
    (newFilter) => {
      setFilter(newFilter);
    },
    [setFilter],
  );

  useEffect(() => {
    const addressTypeFilter = {
      value: address_type,
      name: "Address Type",
      query: "address_type",
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

    const addressFilter = {
      value: address,
      type: "input",
      name: "Address",
      query: "address",
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

    stableSetFilter([
      addressTypeFilter,
      addressFilter,
      { type: "divider" },
      statusFilter,
    ]);
  }, [status, address_type, stableSetFilter, address]);

  return filter;
}
