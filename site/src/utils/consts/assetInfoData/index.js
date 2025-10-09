import { statemineAssetInfo, statemineForeignAssetInfo } from "./statemine";
import { statemintAssetInfo, statemintForeignAssetInfo } from "./statemint";

const assetInfoData = {
  statemine: { ...statemineAssetInfo, ...statemineForeignAssetInfo },
  statemint: { ...statemintAssetInfo, ...statemintForeignAssetInfo },
};

export default assetInfoData;
