import { assetUSDt } from "./usdt-1984";
import { USDC } from "./usdc-1337";
import { Ded } from "./ded-30";
import { Dota } from "./dota-18";
import { foreignAssetMYTH } from "../foreign/myth";
import { constructAssetId } from "../statemine";

const statemintAssetInfo = {
  [constructAssetId(assetUSDt)]: assetUSDt.data,
  [constructAssetId(USDC)]: USDC.data,
  [constructAssetId(Ded)]: Ded.data,
  [constructAssetId(Dota)]: Dota.data,
  [constructAssetId(Dota)]: Dota.data,
  [constructAssetId(foreignAssetMYTH)]: foreignAssetMYTH.data,
};

export default statemintAssetInfo;
