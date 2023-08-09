import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
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

  const { data: registrarsIndexData } = useQuery(GET_REGISTRARS_INDEX);

  useEffect(() => {
    const registrarsFilter = {
      value: getFromQuery(location, "registrarIndex"),
      name: "Registrar Index",
      query: "registrarIndex",
      options: [
        { text: "All", value: "" },
        ...(registrarsIndexData?.registrars ?? []).map(({ index }) => ({
          text: "#" + index,
          value: index?.toString(),
        })),
      ],
      defaultDisplay: "#" + getFromQuery(location, "registrarIndex"),
    };

    setFilter([
      //
      { name: "divider" },
      registrarsFilter,
    ]);
  }, [location, registrarsIndexData]);

  return filter;
}
