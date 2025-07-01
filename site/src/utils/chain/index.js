import { getEnvChain } from "../env";
import chains from "../consts/chains";
import DefaultIcon from "../../components/icons/default";

function addDefaultSettings(settingsObj = {}) {
  const settings = settingsObj || {};
  const { icon, color } = settings || {};
  if (!icon) {
    Object.assign(settings, { icon: <DefaultIcon /> });
  }
  if (!color) {
    Object.assign(settings, {
      color: "#E6007A",
      colorSecondary: "rgba(230,0,122, 0.1)",
    });
  }

  return settings;
}

export function getChainSettings() {
  const chain = getEnvChain();
  const normalizedChainSettings = (Object.values(chains) || []).map(
    addDefaultSettings,
  );
  const setting = normalizedChainSettings.find((item) => item.value === chain);
  if (!setting) {
    throw new Error(`Can not find chain setting of ${chain}`);
  }

  return setting;
}

export function getChainNodes() {
  const settings = getChainSettings();
  return settings.nodes || [];
}

export function getChainDisabledMenus() {
  const settings = getChainSettings();
  return settings?.disabledMenus || [];
}

/**
 * @returns {typeof chains.polkadot.modules & typeof chains.kusama.modules}
 */
export function getChainModules() {
  const settings = getChainSettings();
  return settings.modules || {};
}

export function hasBusiness() {
  const {
    identity,
    multisig,
    recovery,
    vestings,
    proxy,
    assets,
    foreignAssets,
  } = getChainModules();
  return (
    identity ||
    multisig ||
    recovery ||
    vestings ||
    proxy ||
    assets ||
    foreignAssets
  );
}

export function getIsUseOnChainBlockData() {
  const settings = getChainSettings();
  return settings.useOnChainBlockData;
}

export function getFilteredMenus(menus = []) {
  const disabledMenus = getChainDisabledMenus();

  return menus.filter((menu) => {
    return !disabledMenus.includes(menu?.value);
  });
}
