import { assetUSDt } from "./usdt-1984";
import { USDC } from "./usdc-1337";
import { Ded } from "./ded-30";
import { constructAssetId } from "../statemine";

const statemintAssetInfo = {
  [constructAssetId(assetUSDt)]: assetUSDt.data,
  [constructAssetId(USDC)]: USDC.data,
  [constructAssetId(Ded)]: Ded.data,
};

export default statemintAssetInfo;
