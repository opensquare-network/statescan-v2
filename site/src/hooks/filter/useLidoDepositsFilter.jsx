import { useEffect, useState } from "react";
import SearchIcon from "../../components/icons/searchIcon";
import { useTimeDimensionFilterItems } from "../../utils/hooks/useTimeDimensionFilterItems";
import { useQueryParams } from "../useQueryParams";

export function useLidoDepositsFilter() {
  const [filter, setFilter] = useState([]);
  const timeDimensionFilters = useTimeDimensionFilterItems();
  const { address = "", txHash = "" } = useQueryParams({ parseNumbers: false });

  useEffect(() => {
    setFilter([
      {
        value: address,
        type: "input",
        name: "Address",
        query: "address",
        inputProps: {
          placeholder: "Address",
          prefix: <SearchIcon style={{ width: 16, height: 16 }} />,
        },
      },
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
  }, [address, timeDimensionFilters, txHash]);

  return filter;
}
