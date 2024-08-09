import isNil from "lodash.isnil";
import { useQueryParams } from "../useQueryParams";

export function useProxiesParams() {
  const { page = 1, status = null } = useQueryParams();

  return {
    page,
    status: !isNil(status) ? status?.toLowerCase?.() : status,
  };
}
