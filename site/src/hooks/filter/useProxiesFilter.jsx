import capitalize from "lodash.capitalize";
import { useEffect, useState } from "react";
import { PROXY_STATUS } from "../../utils/constants";
import { useProxiesParams } from "../proxy/useProxiesParams";

export function useProxiesFilter() {
  const [filter, setFilter] = useState([]);
  const { status } = useProxiesParams();

  useEffect(() => {
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

    setFilter([statusFilter]);
  }, [status]);

  return filter;
}
