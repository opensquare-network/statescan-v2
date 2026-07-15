import { useEffect, useState } from "react";
import SearchIcon from "../../components/icons/searchIcon";
import { useQueryParams } from "../useQueryParams";

const stakingModuleStatusOptions = [
  { text: "All Status", value: "" },
  { type: "divider" },
  { text: "Active", value: "0" },
  { text: "Deposits Paused", value: "1" },
  { text: "Stopped", value: "2" },
];

export function useLidoStakingModulesFilter() {
  const [filter, setFilter] = useState([]);
  const {
    module = "",
    name = "",
    status = "",
  } = useQueryParams({ parseNumbers: false });

  useEffect(() => {
    setFilter([
      {
        value: module,
        type: "input",
        name: "Module Address",
        query: "module",
        inputProps: {
          placeholder: "Module address",
          prefix: <SearchIcon style={{ width: 16, height: 16 }} />,
        },
      },
      {
        value: name,
        type: "input",
        name: "Module Name",
        query: "name",
        inputProps: {
          placeholder: "Module name",
          prefix: <SearchIcon style={{ width: 16, height: 16 }} />,
        },
      },
      {
        value: status,
        name: "Status",
        query: "status",
        options: stakingModuleStatusOptions,
      },
    ]);
  }, [module, name, status]);

  return filter;
}
