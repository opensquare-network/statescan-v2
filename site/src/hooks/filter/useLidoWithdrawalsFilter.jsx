import { useEffect, useState } from "react";
import SearchIcon from "../../components/icons/searchIcon";
import { LIDO_WITHDRAWAL_STATUS } from "../../utils/constants";
import { useQueryParams } from "../useQueryParams";

const withdrawalStatusOptions = [
  { text: "All Status", value: "" },
  { type: "divider" },
  ...[
    LIDO_WITHDRAWAL_STATUS.PENDING,
    LIDO_WITHDRAWAL_STATUS.FINALIZED,
    LIDO_WITHDRAWAL_STATUS.CLAIMED,
  ].map((value) => ({
    text: value,
    value,
  })),
];

export function useLidoWithdrawalsFilter() {
  const [filter, setFilter] = useState([]);
  const {
    status = "",
    txHash = "",
  } = useQueryParams({ parseNumbers: false });

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
      {
        value: status,
        name: "Status",
        query: "status",
        options: withdrawalStatusOptions,
      },
    ]);
  }, [status, txHash]);

  return filter;
}
