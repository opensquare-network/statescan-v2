import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useLocationSearch } from "../../hooks/useLocationSearch";
import { getFromQuery } from "../filterCommon";

const GET_REGISTRARS_INDEX = gql`
  query GetRegistrarsIndex {
    registrars {
      index
    }
  }
`;

export function useRequestsFilter() {
  const location = useLocation();
  const [filter, setFilter] = useState([]);
  const { account, registrarIndex = "" } = useLocationSearch();

  const { data: registrarsIndexData } = useQuery(GET_REGISTRARS_INDEX);

  useEffect(() => {
    const searchFilter = {
      value: account,
      type: "input",
      name: "Search",
      query: "account",
      inputProps: {
        placeholder: "Address/Identity...",
      },
    };

    const registrarsFilter = {
      value: registrarIndex,
      name: "Registrar Index",
      query: "registrarIndex",
      options: [
        { text: "All", value: "" },
        ...(registrarsIndexData?.registrars ?? []).map(({ index }) => ({
          text: "#" + index,
          value: index?.toString(),
        })),
      ],
      defaultDisplay: "#" + registrarIndex,
    };

    setFilter([
      searchFilter,
      //
      { type: "divider" },
      registrarsFilter,
    ]);
  }, [account, location, registrarIndex, registrarsIndexData]);

  return filter;
}
