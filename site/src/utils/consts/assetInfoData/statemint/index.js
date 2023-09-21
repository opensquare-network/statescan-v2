import { assetUSDt } from "./usdt-1984";
import { USDC } from "./usdc-1337";
import { constructAssetId } from "../statemine";

const statemintAssetInfo = {
  [constructAssetId(assetUSDt)]: assetUSDt.data,
  [constructAssetId(USDC)]: USDC.data,
};

export default statemintAssetInfo;
