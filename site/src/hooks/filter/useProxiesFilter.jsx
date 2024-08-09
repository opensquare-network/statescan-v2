import capitalize from "lodash.capitalize";
import { useEffect, useState } from "react";
import { PROXY_STATUS } from "../../utils/constants";
import { useProxiesParams } from "../proxy/useProxiesParams";

export function useProxiesFilter() {
  const [filter, setFilter] = useState([]);
  const { status, delegationType } = useProxiesParams();

  useEffect(() => {
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

    setFilter([delegationTypeFilter, statusFilter]);
  }, [delegationType, status]);

  return filter;
}
