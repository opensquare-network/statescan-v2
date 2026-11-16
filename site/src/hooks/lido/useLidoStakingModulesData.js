import { GET_LIDO_SERVER_STAKING_MODULES } from "../../services/gql/lido";
import { useLidoServerListQuery } from "./useLidoList";

export function useLidoStakingModulesData() {
  return useLidoServerListQuery({
    query: GET_LIDO_SERVER_STAKING_MODULES,
    field: "stakingModules",
  });
}
