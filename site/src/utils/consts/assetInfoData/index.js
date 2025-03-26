import statemineAssetInfo from "./statemine";
import { statemintAssetInfo, statemintForeignAssetInfo } from "./statemint";
import chains from "../chains";
import { polimecAssetInfo, polimecForeignAssetInfo } from "./polimec";

const assetInfoData = {
  statemine: statemineAssetInfo,
  statemint: { ...statemintAssetInfo, ...statemintForeignAssetInfo },
  [chains.polimec.value]: { ...polimecAssetInfo, ...polimecForeignAssetInfo },
};

export default assetInfoData;
