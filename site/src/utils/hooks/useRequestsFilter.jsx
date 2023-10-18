import { gql } from "@apollo/client";
import { useEffect } from "react";
import { useState } from "react";
import { useQueryParams } from "../../hooks/useQueryParams";
import SearchIcon from "../../components/icons/searchIcon";
import { REQUEST_STATUS } from "../constants";
import capitalize from "lodash.capitalize";
import AddressOrIdentityOrigin from "../../components/address";
import { Flex } from "../../components/styled/flex";
import styled from "styled-components";
import { Overpass_Mono_14_500 } from "../../styles/text";
import toUpper from "lodash.toupper";
import { useIdentityQuery } from "../../hooks/useApollo";

const AddressOrIdentity = styled(AddressOrIdentityOrigin)`
  overflow: hidden;
`;

const Index = styled.div`
  ${Overpass_Mono_14_500};
  color: ${(p) => p.theme.fontSecondary};
`;

const OptionDisplay = styled(Flex)`
  gap: 12px;
  pointer-events: none;

  a {
    position: relative;
    top: 0.5px;
    color: var(--textPrimary);
  }
`;

const GET_REGISTRARS_OPTIONS = gql`
  query GetRegistrarsOptions {
    registrars {
      index
      account
    }
  }
`;

export function useRequestsFilter() {
  const [filter, setFilter] = useState([]);
  const { search = "", registrarIndex = "", status = "" } = useQueryParams();

  const { data: registrarsIndexData } = useIdentityQuery(
    GET_REGISTRARS_OPTIONS,
  );

  useEffect(() => {
    const searchFilter = {
      value: search,
      type: "input",
      name: "Search",
      query: "search",
      inputProps: {
        placeholder: "Address/Identity...",
        prefix: <SearchIcon style={{ width: 16, height: 16 }} />,
      },
    };

    const registrarsFilter = {
      width: 240,
      value: registrarIndex,
      name: "Registrar Index",
      query: "registrarIndex",
      options: [
        { text: "All", value: "" },
        { type: "divider" },
        ...(registrarsIndexData?.registrars ?? []).map(
          ({ index, account }) => ({
            text: (
              <OptionDisplay>
                <Index>#{index}</Index>
                <AddressOrIdentity address={account} />
              </OptionDisplay>
            ),
            value: index,
          }),
        ),
      ],
    };

    const statusFilter = {
      value: toUpper(status),
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
          value: status.toUpperCase(),
        })),
      ],
    };

    setFilter([
      searchFilter,
      { type: "divider" },
      registrarsFilter,
      statusFilter,
    ]);
  }, [search, registrarIndex, registrarsIndexData, status]);

  return filter;
}
