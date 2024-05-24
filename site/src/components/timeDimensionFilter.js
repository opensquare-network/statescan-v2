import { useTimeDimensionFilterItems } from "../utils/hooks/useTimeDimensionFilterItems";
import Filter from "./filter";

export function TimeDimensionFilter() {
  const timeDimensionFilterItems = useTimeDimensionFilterItems();

  return <Filter data={timeDimensionFilterItems} />;
}
