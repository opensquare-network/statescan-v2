import { assetUSDt } from "./usdt-1984";
import { USDC } from "./usdc-1337";
import { Ded } from "./ded-30";
import { Dota } from "./dota-18";
import { Pink } from "./pink-23";
import { WUD } from "./wud-31337";
import { STINK } from "./stink-42069";
import { WIFD } from "./wifd-17";
import { BEEFY } from "./beefy-420";
import { ASX } from "./asx-888";
import { NCTR } from "./nctr-1024";
import { GAME } from "./game-555";
import * as foreignAssets from "../foreign";
import { constructAssetId } from "../statemine";
import { formatForeignAssetsInfo } from "../../../formatforeignAssetsInfo";

export const statemintAssetInfo = {
  [constructAssetId(assetUSDt)]: assetUSDt.data,
  [constructAssetId(USDC)]: USDC.data,
  [constructAssetId(Ded)]: Ded.data,
  [constructAssetId(Dota)]: Dota.data,
  [constructAssetId(Pink)]: Pink.data,
  [constructAssetId(WUD)]: WUD.data,
  [constructAssetId(STINK)]: STINK.data,
  [constructAssetId(WIFD)]: WIFD.data,
  [constructAssetId(BEEFY)]: BEEFY.data,
  [constructAssetId(ASX)]: ASX.data,
  [constructAssetId(NCTR)]: NCTR.data,
  [constructAssetId(GAME)]: GAME.data,
};

export const statemintForeignAssetInfo = formatForeignAssetsInfo(foreignAssets);
