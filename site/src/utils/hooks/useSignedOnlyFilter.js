import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  fetchSpecsFilter,
  filtersSelector,
} from "../../store/reducers/filterSlice";
import { signedOnlyFilter } from "../constants";
import { getFromQuery } from "../filterCommon";

export function useSignedOnlyFilter() {
  const dispatch = useDispatch();
  const location = useLocation();
  const specFilters = useSelector(filtersSelector);
  const signedOnly = getFromQuery(location, "signed_only", "true");

  useEffect(() => {
    if (!specFilters) {
      dispatch(fetchSpecsFilter());
    }
  }, [dispatch, specFilters]);

  return [{ ...signedOnlyFilter, value: signedOnly }];
}
