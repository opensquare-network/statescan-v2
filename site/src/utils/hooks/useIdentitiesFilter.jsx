import { useEffect, useState } from "react";
import { useQueryParams } from "../../hooks/useQueryParams";
import SearchIcon from "../../components/icons/searchIcon";
import { IDENTITY_ID_TYPE, IDENTITY_TYPE } from "../constants";
import capitalize from "lodash.capitalize";
import toUpper from "lodash.toupper";
import startCase from "lodash.startcase";
import IdentityIcon from "../../components/address/identityIcon";
import { Flex } from "../../components/styled/flex";

export function useIdentitiesFilter() {
  const [filter, setFilter] = useState([]);
  const { search = "", identityType, verificationStatus } = useQueryParams();

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

    const identityTypeFilter = {
      value: identityType,
      name: "Identity Type",
      query: "identityType",
      options: [
        { text: "All", value: undefined },
        { type: "divider" },
        ...[IDENTITY_TYPE.DIRECT, IDENTITY_TYPE.SUB].map((type) => ({
          text: capitalize(type),
          value: toUpper(type),
        })),
      ],
    };

    const verificationStatusFilter = {
      value: toUpper(verificationStatus),
      name: "Verification Status",
      query: "verificationStatus",
      options: [
        { text: "All Status", value: undefined },
        { type: "divider" },
        ...[
          IDENTITY_ID_TYPE.VERIFIED,
          IDENTITY_ID_TYPE.NOT_VERIFIED,
          IDENTITY_ID_TYPE.ERRONEOUS,
        ].map((type) => ({
          text: (
            <Flex gap={8}>
              <IdentityIcon status={type} />
              {startCase(capitalize(type))}
            </Flex>
          ),
          value: toUpper(type),
        })),
      ],
    };

    setFilter([
      searchFilter,
      { type: "divider" },
      identityTypeFilter,
      verificationStatusFilter,
    ]);
  }, [search, identityType, verificationStatus]);

  return filter;
}
