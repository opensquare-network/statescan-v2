import { useTimeDimensionFilterItems } from "../../../utils/hooks/useTimeDimensionFilterItems";
import CombinedFilter from "../../filter/combinedFilter";
import { useCallsFilter } from "../../../utils/hooks/callsFilter";

export default function CallFilter() {
  const secondMethodFilters = useCallsFilter();
  const timeDimensionFilters = useTimeDimensionFilterItems();
  return (
    <CombinedFilter
      filters1={secondMethodFilters}
      filters2={timeDimensionFilters}
    />
  );
}
