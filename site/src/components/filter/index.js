import { useState } from "react";
import { FlexCenter } from "../styled/flex";
import FilterIcon from "./filterIcon";
import { useWindowSize } from "@osn/common";
import { useIsDark } from "../../utils/hooks";
import noop from "lodash.noop";
import Loading from "../loadings/loading";
import useFilter from "./useFilter";
import {
  FilterActions,
  FilterButton,
  FilterForm,
  FilterWrapper,
  ForSmallScreen,
  HeadWrapper,
  ResetButton,
  Title,
  Wrapper,
} from "./styled";

export default function Filter({
  title,
  data,
  showFilterButton = true,
  showResetButton = true,
  filterOnDataChange,
  onDataChange = noop,
}) {
  const { selectData, component, handleReset, handleFilter } = useFilter({
    data,
    filterOnDataChange,
    onDataChange,
  });
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const { width } = useWindowSize();
  const isDark = useIsDark();

  const resetButton = <ResetButton onClick={handleReset}>Reset</ResetButton>;
  const filterButton = (
    <FilterButton dark={isDark} onClick={handleFilter}>
      Filter
    </FilterButton>
  );

  if (!data?.length) {
    return (
      <Wrapper style={{ height: 56 }}>
        <FlexCenter style={{ width: "100%" }}>
          <Loading style={{ padding: 0 }} />
        </FlexCenter>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {title && (
        <HeadWrapper>
          <Title>{title}</Title>
        </HeadWrapper>
      )}
      <ForSmallScreen>
        <FilterIcon
          active={showFilterPanel}
          onClick={() => setShowFilterPanel(!showFilterPanel)}
        />
      </ForSmallScreen>
      {(showFilterPanel || width > 900) && selectData?.length > 0 && (
        <FilterWrapper>
          <FilterForm>{component}</FilterForm>
          <FilterActions>
            {showResetButton && resetButton}
            {showFilterButton && filterButton}
          </FilterActions>
        </FilterWrapper>
      )}
    </Wrapper>
  );
}
