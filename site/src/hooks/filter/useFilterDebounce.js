import { differenceBy, isEqual } from "lodash";
import { useState } from "react";
import { useUpdateEffect } from "usehooks-ts";

/**
 * @description for `filter` component, input type only
 */
export function useFilterDebounce(
  selectData = [],
  delay = 500,
  { debounceTypes = ["input"] } = {},
) {
  const [debouncedValue, setDebouncedValue] = useState(selectData);
  const [prevSelectData, setPrevSelectData] = useState();

  useUpdateEffect(() => {
    setPrevSelectData(selectData);
  }, [selectData]);

  useUpdateEffect(() => {
    if (isEqual(selectData, prevSelectData)) {
      return;
    }

    let timer;
    const diffs = differenceBy(selectData, prevSelectData, "value");
    const shouldDebounce = diffs.some((diff) =>
      debounceTypes?.includes?.(diff.type),
    );

    if (shouldDebounce) {
      timer = setTimeout(() => {
        setDebouncedValue(selectData);
      }, delay);
    } else {
      setDebouncedValue(selectData);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [selectData, delay]);

  return debouncedValue;
}
