import { useEffect, useState } from "react";
import SearchIcon from "../../components/icons/searchIcon";
import { useTimeDimensionFilterItems } from "../../utils/hooks/useTimeDimensionFilterItems";
import { useQueryParams } from "../useQueryParams";

export function useLidoTreasuryTransfersFilter() {
  const [filter, setFilter] = useState([]);
  const timeDimensionFilters = useTimeDimensionFilterItems();
  const { txHash = "" } = useQueryParams({ parseNumbers: false });

  useEffect(() => {
    setFilter([
      {
        value: txHash,
        type: "input",
        name: "Tx Hash",
        query: "txHash",
        inputProps: {
          placeholder: "Transaction hash",
          prefix: <SearchIcon style={{ width: 16, height: 16 }} />,
        },
      },
      { type: "divider" },
      ...timeDimensionFilters,
    ]);
  }, [timeDimensionFilters, txHash]);

  return filter;
}
