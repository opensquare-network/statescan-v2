import { useSignedOnlyFilter } from "../../../utils/hooks/useSignedOnlyFilter";
import { useTimeDimensionFilterItems } from "../../../utils/hooks/useTimeDimensionFilterItems";
import CombinedFilter from "../../filter/combinedFilter";

export default function TransferFilter() {
  const signedOnlyFilters = useSignedOnlyFilter();
  const timeDimensionFilters = useTimeDimensionFilterItems();
  return (
    <CombinedFilter
      filters1={signedOnlyFilters}
      filters2={timeDimensionFilters}
    />
  );
}
