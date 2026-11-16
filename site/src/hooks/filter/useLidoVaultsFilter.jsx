import { useEffect, useState } from "react";
import SearchIcon from "../../components/icons/searchIcon";
import { LIDO_VAULT_STATUS_OPTIONS } from "../../components/lido/stakingVault/status";
import { useQueryParams } from "../useQueryParams";

const vaultStatusOptions = [
  { text: "All Status", value: "" },
  { type: "divider" },
  ...LIDO_VAULT_STATUS_OPTIONS.map((value) => ({
    text: value,
    value,
  })),
];

export function useLidoVaultsFilter() {
  const [filter, setFilter] = useState([]);
  const {
    vault = "",
    operator = "",
    status = "",
  } = useQueryParams({
    parseNumbers: false,
  });

  useEffect(() => {
    setFilter([
      {
        value: vault,
        type: "input",
        name: "Vault",
        query: "vault",
        inputProps: {
          placeholder: "Vault address",
          prefix: <SearchIcon style={{ width: 16, height: 16 }} />,
        },
      },
      {
        value: operator,
        type: "input",
        name: "Operator",
        query: "operator",
        inputProps: {
          placeholder: "Operator address",
          prefix: <SearchIcon style={{ width: 16, height: 16 }} />,
        },
      },
      { type: "divider" },
      {
        value: status,
        name: "Status",
        query: "status",
        options: vaultStatusOptions,
      },
    ]);
  }, [operator, status, vault]);

  return filter;
}
