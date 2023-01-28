import noop from "lodash.noop";
import { useEffect } from "react";

export function useEffectOnce(callback = noop) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(callback, []);
}
