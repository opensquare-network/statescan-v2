import { useExtrinsicSecondMethodFilter } from "./useExtrinsicSecondMethodFilter";
import { useTimeDimensionFilterItems } from "../../../utils/hooks/useTimeDimensionFilterItems";
import CombinedFilter from "../../filter/combinedFilter";

export default function ExtrinsicFilter() {
  const secondMethodFilters = useExtrinsicSecondMethodFilter();
  const timeDimensionFilters = useTimeDimensionFilterItems();
  return (
    <CombinedFilter
      filters1={secondMethodFilters}
      filters2={timeDimensionFilters}
    />
  );
}
