import { statemineAssetInfo, statemineForeignAssetInfo } from "./statemine";
import { statemintAssetInfo, statemintForeignAssetInfo } from "./statemint";
import chains from "../chains";
import { polimecAssetInfo, polimecForeignAssetInfo } from "./polimec";

const assetInfoData = {
  statemine: { ...statemineAssetInfo, ...statemineForeignAssetInfo },
  statemint: { ...statemintAssetInfo, ...statemintForeignAssetInfo },
  [chains.polimec.value]: { ...polimecAssetInfo, ...polimecForeignAssetInfo },
};

export default assetInfoData;
