import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function useQueryParamsUpdater() {
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(
    (name, value) => {
      const searchParams = new URLSearchParams(location.search);
      if (searchParams.get(name) === value) {
        return;
      }
      searchParams.set(name, value);
      navigate({
        pathname: location.pathname,
        search: searchParams.toString(),
      });
    },
    [navigate, location],
  );
}
