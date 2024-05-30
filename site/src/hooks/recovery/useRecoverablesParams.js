import { useQueryParams } from "../useQueryParams";

export function useRecoverablesParams() {
  const { account = "", status = null, page = 1 } = useQueryParams();
  return { account, status, page };
}
