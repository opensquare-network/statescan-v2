import { chainNames, chains } from "./constants";

export function getEnvChain() {
  // check env `REACT_APP_PUBLIC_CHAIN` setting
  const chain = process.env.REACT_APP_PUBLIC_CHAIN;
  if (!chainNames.includes(chain)) {
    throw new Error(`Invalid REACT_APP_PUBLIC_CHAIN setting: ${chain}`);
  }

  return chain;
}

export function getChainSetting(chain) {
  const setting = chains.find((item) => item.value === chain);
  if (!setting) {
    throw new Error(`Can not find chain setting of ${chain}`);
  }

  return setting;
}

export function getChainSettingByEnv() {
  const chain = getEnvChain();
  return getChainSetting(chain);
}
