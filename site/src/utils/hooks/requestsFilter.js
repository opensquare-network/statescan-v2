import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useState } from "react";
import { useQueryParams } from "../../hooks/useQueryParams";
import SearchIcon from "../../components/icons/searchIcon";

const GET_REGISTRARS_INDEX = gql`
  query GetRegistrarsIndex {
    registrars {
      index
    }
  }
`;

export function useRequestsFilter() {
  const [filter, setFilter] = useState([]);
  const { account = "", registrarIndex = "" } = useQueryParams();

  const { data: registrarsIndexData } = useQuery(GET_REGISTRARS_INDEX);

  useEffect(() => {
    const searchFilter = {
      value: account,
      type: "input",
      name: "Search",
      query: "account",
      inputProps: {
        placeholder: "Address/Identity...",
        prefix: <SearchIcon style={{ width: 16, height: 16 }} />,
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
  }, [account, registrarIndex, registrarsIndexData]);

  return filter;
}
