import { useEventSectionMethodFilter } from "./useEventSectionMethodFilter";
import { useTimeDimensionFilterItems } from "../../../utils/hooks/useTimeDimensionFilterItems";
import CombinedFilter from "../../filter/combinedFilter";

export default function EventFilter() {
  const secondMethodFilters = useEventSectionMethodFilter();
  const timeDimensionFilters = useTimeDimensionFilterItems();
  return (
    <CombinedFilter
      filters1={secondMethodFilters}
      filters2={timeDimensionFilters}
    />
  );
}
