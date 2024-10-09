import { useEventSectionMethodFilter } from "./useEventSectionMethodFilter";
import { useTimeDimensionFilterItems } from "../../../utils/hooks/useTimeDimensionFilterItems";
import CombinedFilter from "../../filter/combinedFilter";

export default function EventFilter() {
  const sectionMethodFilters = useEventSectionMethodFilter();
  const timeDimensionFilters = useTimeDimensionFilterItems();
  return (
    <CombinedFilter
      filters1={sectionMethodFilters}
      filters2={timeDimensionFilters}
    />
  );
}
