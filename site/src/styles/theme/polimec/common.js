import { getChainSettings } from "../../../utils/chain";

const chainSetting = getChainSettings();

export const isPolimec = chainSetting.value === "polimec";
