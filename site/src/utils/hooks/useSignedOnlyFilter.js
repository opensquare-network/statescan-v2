import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  currentFilterValueSelector,
  setCurrentFilterValue,
} from "../../store/reducers/filterSlice";
import { signedOnlyFilter } from "../constants";
import { getFromQuery } from "../filterCommon";

export function useSignedOnlyFilter() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [filters, setFilters] = useState([]);
  const currentFilterValue = useSelector(currentFilterValueSelector);

  useEffect(() => {
    return () => {
      dispatch(setCurrentFilterValue({}));
    };
  }, [dispatch]);

  useEffect(() => {
    const signedOnlyValue =
      currentFilterValue.signed_only ??
      getFromQuery(location, "signed_only", "true");

    setFilters([
      {
        ...signedOnlyFilter,
        value: signedOnlyValue,
      },
    ]);
  }, [location, currentFilterValue]);

  return filters;
}
