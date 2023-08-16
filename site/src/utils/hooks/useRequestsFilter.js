import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useState } from "react";
import { useQueryParams } from "../../hooks/useQueryParams";
import SearchIcon from "../../components/icons/searchIcon";
import { REQUEST_STATUS } from "../constants";
import capitalize from "lodash.capitalize";

const GET_REGISTRARS_INDEX = gql`
  query GetRegistrarsIndex {
    registrars {
      index
    }
  }
`;

export function useRequestsFilter() {
  const [filter, setFilter] = useState([]);
  const { account = "", registrarIndex = "", status = "" } = useQueryParams();

  const { data: registrarsIndexData } = useQuery(GET_REGISTRARS_INDEX);

  useEffect(() => {
    const searchFilter = {
      value: account,
      type: "input",
      name: "Search",
      query: "account",
      inputProps: {
        placeholder: "Address...",
        prefix: <SearchIcon style={{ width: 16, height: 16 }} />,
      },
    };

    const registrarsFilter = {
      value: registrarIndex,
      name: "Registrar Index",
      query: "registrarIndex",
      options: [
        { text: "All", value: "" },
        { type: "divider" },
        ...(registrarsIndexData?.registrars ?? []).map(({ index }) => ({
          text: "#" + index,
          value: index?.toString(),
        })),
      ],
      defaultDisplay: "#" + registrarIndex,
    };

    const statusFilter = {
      value: status,
      name: "Status",
      query: "status",
      options: [
        { text: "All status", value: "" },
        { type: "divider" },
        ...[
          REQUEST_STATUS.PENDING,
          REQUEST_STATUS.REMOVED,
          REQUEST_STATUS.CANCELLED,
          REQUEST_STATUS.GIVEN,
        ].map((status) => ({
          text: capitalize(status),
          value: status,
        })),
      ],
    };

    setFilter([
      searchFilter,
      { type: "divider" },
      registrarsFilter,
      statusFilter,
    ]);
  }, [account, registrarIndex, registrarsIndexData, status]);

  return filter;
}
