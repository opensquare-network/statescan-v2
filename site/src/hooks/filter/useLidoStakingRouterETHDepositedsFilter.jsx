import { useEffect, useMemo, useState } from "react";
import SearchIcon from "../../components/icons/searchIcon";
import { GET_LIDO_STAKING_MODULES } from "../../services/gql/lido";
import { useTimeDimensionFilterItems } from "../../utils/hooks/useTimeDimensionFilterItems";
import { useLidoQuery } from "../lido/useLidoQuery";
import { useQueryParams } from "../useQueryParams";

const STAKING_MODULES_VARIABLES = {
  first: 100,
  orderBy: "stakingModuleId",
  orderDirection: "asc",
};

function toStakingModuleOptions(items = []) {
  return [
    { text: "All Modules", value: "" },
    { type: "divider" },
    ...items.map((item) => ({
      text: item.name || "--",
      value: String(item.stakingModuleId),
    })),
  ];
}

export function useLidoStakingRouterETHDepositedsFilter() {
  const [filter, setFilter] = useState([]);
  const timeDimensionFilters = useTimeDimensionFilterItems();
  const { stakingModuleId = "", txHash = "" } = useQueryParams({
    parseNumbers: false,
  });
  const { data } = useLidoQuery(GET_LIDO_STAKING_MODULES, {
    variables: STAKING_MODULES_VARIABLES,
  });
  const moduleOptions = useMemo(
    () => toStakingModuleOptions(data?.stakingModules),
    [data?.stakingModules],
  );

  useEffect(() => {
    setFilter([
      {
        value: stakingModuleId,
        name: "Module",
        query: "stakingModuleId",
        options: moduleOptions,
        width: 180,
        optionWidth: "220px",
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
  }, [moduleOptions, stakingModuleId, timeDimensionFilters, txHash]);

  return filter;
}
