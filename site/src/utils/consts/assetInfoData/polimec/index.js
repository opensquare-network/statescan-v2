import { constructAssetId } from "../statemine";
import polimecUSDt from "./usdt-1984";
import polimecUSDC from "./usdc-1337";
import polimecDot from "./dot-10";
import * as foreignAssets from "../foreign";

export const polimecAssetInfo = {
  [constructAssetId(polimecUSDt)]: polimecUSDt.data,
  [constructAssetId(polimecUSDC)]: polimecUSDC.data,
  [constructAssetId(polimecDot)]: polimecDot.data,
};

const foreignAssetsEntries = Object.values(foreignAssets).map(
  ({ id, data }) => [id, data],
);

export const polimecForeignAssetInfo = Object.fromEntries(foreignAssetsEntries);
