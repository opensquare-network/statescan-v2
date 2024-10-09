import { useTimeDimensionFilterItems } from "../../../utils/hooks/useTimeDimensionFilterItems";
import CombinedFilter from "../../filter/combinedFilter";
import { useCallSectionMethodFilter } from "./useCallSectionMethodFilter";

export default function CallFilter() {
  const sectionMethodFilters = useCallSectionMethodFilter();
  const timeDimensionFilters = useTimeDimensionFilterItems();
  return (
    <CombinedFilter
      filters1={sectionMethodFilters}
      filters2={timeDimensionFilters}
    />
  );
}
