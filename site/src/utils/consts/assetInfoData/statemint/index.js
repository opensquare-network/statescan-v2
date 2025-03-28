import { assetUSDt } from "./usdt-1984";
import { USDC } from "./usdc-1337";
import { Ded } from "./ded-30";
import { Dota } from "./dota-18";
import * as foreignAssets from "../foreign";
import { constructAssetId } from "../statemine";
import { formatForeignAssetsInfo } from "../../../formatforeignAssetsInfo";

export const statemintAssetInfo = {
  [constructAssetId(assetUSDt)]: assetUSDt.data,
  [constructAssetId(USDC)]: USDC.data,
  [constructAssetId(Ded)]: Ded.data,
  [constructAssetId(Dota)]: Dota.data,
};

export const statemintForeignAssetInfo = formatForeignAssetsInfo(foreignAssets);
