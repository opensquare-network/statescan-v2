import statemineAssetInfo from "./statemine";
import statemintAssetInfo from "./statemint";
import chains from "../chains";
import polimecAssetInfo from "./polimec";

const assetInfoData = {
  statemine: statemineAssetInfo,
  statemint: statemintAssetInfo,
  [chains.polimec.value]: polimecAssetInfo,
};

export default assetInfoData;
