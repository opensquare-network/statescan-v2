import { useCallback, useState } from "react";
import FilterIcon from "./filterIcon";
import { useWindowSize } from "@osn/common";
import { useIsDark } from "../../utils/hooks";
import {
  FilterActions,
  FilterButton,
  FilterDivider,
  FilterGroup,
  FilterGroups,
  FilterWrapper,
  ForSmallScreen,
  ResetButton,
  Wrapper,
} from "./styled";
import useFilter from "./useFilter";
import { TABLE_SORT_QUERY_KEY } from "../../utils/constants";
import { useQueryParams } from "../../hooks/useQueryParams";
import { serialize } from "../../utils/viewFuncs";
import { useNavigate } from "react-router-dom";

export default function CombinedFilter({ filters1, filters2 }) {
  const params = useQueryParams();
  const navigate = useNavigate();

  const {
    component: filters1Component,
    handleReset: resetFilters1,
    getCurrentFilter: getFilters1Values,
  } = useFilter({
    data: filters1,
  });

  const {
    component: filters2Component,
    handleReset: resetFilters2,
    getCurrentFilter: getFilters2Values,
  } = useFilter({
    data: filters2,
  });

  const reset = useCallback(() => {
    resetFilters1();
    resetFilters2();
  }, [resetFilters1, resetFilters2]);

  const handleFilter = useCallback(() => {
    const methodValue = getFilters1Values();
    const timeDimensionValue = getFilters2Values();

    const value = { ...methodValue, ...timeDimensionValue };
    if (params[TABLE_SORT_QUERY_KEY]) {
      value[TABLE_SORT_QUERY_KEY] = params[TABLE_SORT_QUERY_KEY];
    }

    const search = serialize(value);
    navigate({ search: `?${search}${search ? "&" : ""}page=1` });
  }, [getFilters1Values, getFilters2Values, navigate, params]);

  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const { width } = useWindowSize();
  const isDark = useIsDark();

  return (
    <Wrapper>
      <ForSmallScreen>
        <FilterIcon
          active={showFilterPanel}
          onClick={() => setShowFilterPanel(!showFilterPanel)}
        />
      </ForSmallScreen>
      {(showFilterPanel || width > 900) && (
        <FilterWrapper>
          <FilterGroups>
            <FilterGroup>{filters1Component}</FilterGroup>
            <FilterDivider />
            <FilterGroup>{filters2Component}</FilterGroup>
          </FilterGroups>
          <FilterActions>
            <div style={{ width: "60px" }}>
              <ResetButton onClick={reset}>Reset</ResetButton>
            </div>
            <div style={{ width: "60px" }}>
              <FilterButton dark={isDark} onClick={handleFilter}>
                Filter
              </FilterButton>
            </div>
          </FilterActions>
        </FilterWrapper>
      )}
    </Wrapper>
  );
}
