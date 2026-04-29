import { useEffect, useState } from "react";
import SearchIcon from "../../components/icons/searchIcon";
import { useQueryParams } from "../useQueryParams";

export function useLidoDepositsFilter() {
  const [filter, setFilter] = useState([]);
  const {
    address = "",
    txHash = "",
  } = useQueryParams();

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
    ]);
  }, [address, txHash]);

  return filter;
}
