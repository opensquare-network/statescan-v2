import capitalize from "lodash.capitalize";
import isNil from "lodash.isnil";
import { useEffect, useState } from "react";
import SearchIcon from "../../components/icons/searchIcon";
import InputWithSelectPrefix from "../../components/input/inputWithSelectPrefix";
import { PROXY_STATUS } from "../../utils/constants";
import { useProxiesParams } from "../proxy/useProxiesParams";

const searchOptions = [
  {
    text: "Delegatee",
    value: "delegatee",
  },
  {
    text: "Delegator",
    value: "delegator",
  },
];

export function useProxiesFilter() {
  const [filter, setFilter] = useState([]);
  const { status, delegationType, delegatee, delegator } = useProxiesParams();
  const searchValue = delegatee || delegator;

  const [searchQuery, setSearchQuery] = useState(
    delegator ? searchOptions[1].value : searchOptions[0].value,
  );
  const [searchInput, setSearchInput] = useState(searchValue);
  useEffect(() => {
    if (isNil(delegatee || delegator)) {
      setSearchInput(null);
    }
  }, [delegatee, delegator]);

  useEffect(() => {
    const searchFilter = {
      value: searchInput,
      name: "Search",
      query: searchQuery,
      type: "custom",
      component: (
        <InputWithSelectPrefix
          mini
          prefix={<SearchIcon style={{ width: 16, height: 16 }} />}
          value={searchInput || ""}
          placeholder="Address"
          selectValue={searchQuery}
          onSelect={(_, value) => {
            setSearchQuery(value);
          }}
          selectOptions={searchOptions}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
      ),
    };

    const delegationTypeFilter = {
      value: delegationType,
      name: "Delegation Type",
      query: "delegationType",
      options: [
        { text: "All types", value: null },
        { type: "divider" },
        { text: "Pure", value: "pure" },
      ],
    };

    const statusFilter = {
      value: status,
      name: "Status",
      query: "status",
      options: [
        { text: "All Status", value: null },
        { type: "divider" },
        { text: capitalize(PROXY_STATUS.ACTIVE), value: PROXY_STATUS.ACTIVE },
        { text: capitalize(PROXY_STATUS.REMOVED), value: PROXY_STATUS.REMOVED },
      ],
    };

    setFilter([
      searchFilter,
      { type: "divider" },
      delegationTypeFilter,
      statusFilter,
    ]);
  }, [delegationType, searchQuery, searchInput, status, delegatee, delegator]);

  return filter;
}
