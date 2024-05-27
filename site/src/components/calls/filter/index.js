import { useTimeDimensionFilterItems } from "../../../utils/hooks/useTimeDimensionFilterItems";
import CombinedFilter from "../../filter/combinedFilter";
import { useCallSecondMethodFilter } from "./useCallSecondMethodFilter";

export default function CallFilter() {
  const secondMethodFilters = useCallSecondMethodFilter();
  const timeDimensionFilters = useTimeDimensionFilterItems();
  return (
    <CombinedFilter
      filters1={secondMethodFilters}
      filters2={timeDimensionFilters}
    />
  );
}
