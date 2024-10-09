import { useExtrinsicSectionMethodFilter } from "./useExtrinsicSectionMethodFilter";
import { useTimeDimensionFilterItems } from "../../../utils/hooks/useTimeDimensionFilterItems";
import CombinedFilter from "../../filter/combinedFilter";

export default function ExtrinsicFilter() {
  const sectionMethodFilters = useExtrinsicSectionMethodFilter();
  const timeDimensionFilters = useTimeDimensionFilterItems();
  return (
    <CombinedFilter
      filters1={sectionMethodFilters}
      filters2={timeDimensionFilters}
    />
  );
}
