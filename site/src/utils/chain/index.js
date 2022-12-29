import { chains } from "../constants";
import { getEnvChain } from "../env";

export function getChainSettings() {
  const chain = getEnvChain();
  const setting = chains.find((item) => item.value === chain);
  if (!setting) {
    throw new Error(`Can not find chain setting of ${chain}`);
  }

  return setting;
}

export function getChainModules() {
  const settings = getChainSettings();
  return settings.modules || {};
}
