import { useCallback, useState } from "react";
import FilterIcon from "../../filter/filterIcon";
import { useWindowSize } from "@osn/common";
import { useIsDark } from "../../../utils/hooks";
import {
  FilterActions,
  FilterButton,
  FilterForm,
  FilterWrapper,
  ForSmallScreen,
  ResetButton,
  Wrapper,
} from "../../filter/styled";
import { useMethodFilter } from "./useMethodFilter";
import useFilter from "../../filter/useFilter";
import { useTimeDimensionFilterItems } from "../../../utils/hooks/useTimeDimensionFilterItems";

export default function ExtrinsicFilter() {
  const methodFilters = useMethodFilter();
  const {
    // selectData: methodFiltersData,
    filterComponent: methodFiltersComponent,
    handleReset: resetMethodFilters,
    // handleFilter: filterBySectionMethod,
    getCurrentFilter: getMethodFilterValues,
  } = useFilter({
    data: methodFilters,
  });

  const timeDimensionFilters = useTimeDimensionFilterItems();
  const {
    // selectData: timeDimensionFiltersData,
    filterComponent: timeDimensionFiltersComponent,
    handleReset: resetTimeDimensionFilters,
    // handleFilter: filterByTimeDimension,
    getCurrentFilter: getTimeDimensionFilterValues,
  } = useFilter({
    data: timeDimensionFilters,
  });

  const reset = useCallback(() => {
    resetMethodFilters();
    resetTimeDimensionFilters();
  }, [resetMethodFilters, resetTimeDimensionFilters]);

  const handleFilter = useCallback(() => {
    const methodValue = getMethodFilterValues();
    const timeDimensionValue = getTimeDimensionFilterValues();

    console.log({
      methodValue,
      timeDimensionValue,
    });
  }, [getMethodFilterValues, getTimeDimensionFilterValues]);

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
          <FilterForm>
            {methodFiltersComponent}
            {timeDimensionFiltersComponent}
          </FilterForm>
          <FilterActions>
            <ResetButton onClick={reset}>Reset</ResetButton>
            <FilterButton dark={isDark} onClick={handleFilter}>
              Filter
            </FilterButton>
          </FilterActions>
        </FilterWrapper>
      )}
    </Wrapper>
  );
}
