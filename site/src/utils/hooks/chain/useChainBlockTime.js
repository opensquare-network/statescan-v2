import isNil from "lodash.isnil";
import { useEffect, useState } from "react";
import { useChainApi } from "./useChainApi";
import useChainSettings from "./useChainSettings";

export function useChainBlockTime() {
  const api = useChainApi();
  const { blockTime } = useChainSettings();
  const [value, setValue] = useState(blockTime);

  useEffect(() => {
    if (!isNil(blockTime)) {
      return;
    }

    if (!api) {
      return;
    }

    setValue(api?.consts?.babe?.expectedBlockTime?.toNumber?.());
  }, [api, blockTime]);

  return value;
}
