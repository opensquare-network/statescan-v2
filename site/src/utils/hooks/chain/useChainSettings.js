import { getEnvChain } from "../../env";
import chains from "../../consts/chains";
import isNil from "lodash.isnil";
import { useEffect, useState } from "react";

export default function useChainSettings(blockHeight) {
  const chain = getEnvChain();
  /**
   * @type {[typeof chains.kusama]}
   */
  const [settings, setSettings] = useState(chains[chain]);

  useEffect(() => {
    if (settings.blockHeightSettings && !isNil(blockHeight)) {
      const heights = Object.keys(settings.blockHeightSettings)
        .map(Number)
        // descending block heights
        .sort((a, b) => b - a);

      const blockHeightSettingsPatch =
        settings.blockHeightSettings[
          heights.find((height) => blockHeight >= height)
        ];

      if (blockHeightSettingsPatch) {
        setSettings((s) => {
          return {
            ...s,
            ...blockHeightSettingsPatch,
          };
        });
      }
    }
  }, [blockHeight, settings.blockHeightSettings]);

  return settings;
}
