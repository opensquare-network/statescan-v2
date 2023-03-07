import { assetUSDt } from "./usdt-1984";
import { constructAssetId } from "../statemine";

const statemintAssetInfo = {
  [constructAssetId(assetUSDt)]: assetUSDt.data,
};

export default statemintAssetInfo;
