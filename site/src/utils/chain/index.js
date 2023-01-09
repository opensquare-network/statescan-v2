import { getEnvChain } from "../env";
import chains from "../consts/chains";

export function getChainSettings() {
  const chain = getEnvChain();
  const setting = Object.values(chains).find((item) => item.value === chain);
  if (!setting) {
    throw new Error(`Can not find chain setting of ${chain}`);
  }

  return setting;
}

export function getChainModules() {
  const settings = getChainSettings();
  return settings.modules || {};
}
