import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TABLE_SORT_QUERY_KEY } from "../../utils/constants";

export function useLidoSubTabSwitcher() {
  const location = useLocation();
  const navigate = useNavigate();

  return useCallback(
    (tab) => {
      const searchParams = new URLSearchParams(location.search);
      searchParams.set("sub", tab);
      searchParams.set("page", "1");
      searchParams.delete(TABLE_SORT_QUERY_KEY);
      navigate({
        pathname: location.pathname,
        search: searchParams.toString(),
      });
    },
    [location, navigate],
  );
}
