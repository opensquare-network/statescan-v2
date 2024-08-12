import capitalize from "lodash.capitalize";
import { useEffect, useState } from "react";
import SearchIcon from "../../components/icons/searchIcon";
import InputWithSelectPrefix from "../../components/input/inputWithSelectPrefix";
import { PROXY_STATUS } from "../../utils/constants";
import { useProxiesParams } from "../proxy/useProxiesParams";

export function useProxiesFilter() {
  const [filter, setFilter] = useState([]);
  const { status, delegationType } = useProxiesParams();

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
  const [searchQuery, setSearchQuery] = useState(searchOptions[0].value);
  const [searchValue, setSearchValue] = useState();

  useEffect(() => {
    const searchFilter = {
      value: searchValue,
      name: "Search",
      query: searchQuery,
      type: "custom",
      component: (
        <InputWithSelectPrefix
          mini
          inputPrefix={<SearchIcon style={{ width: 16, height: 16 }} />}
          placeholder="Address"
          selectValue={searchQuery}
          onSelect={(_, value) => {
            setSearchQuery(value);
          }}
          options={searchOptions}
          onChange={(e) => {
            setSearchValue(e.target.value);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delegationType, searchQuery, searchValue, status]);

  return filter;
}
