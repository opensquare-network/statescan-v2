import { constructAssetId } from "../statemine";
import polimecUSDt from "./usdt-1984";
import polimecUSDC from "./usdc-1337";
import polimecDot from "./dot-10";
import { foreignAssetMYTH } from "../foreign";

export const polimecAssetInfo = {
  [constructAssetId(polimecUSDt)]: polimecUSDt.data,
  [constructAssetId(polimecUSDC)]: polimecUSDC.data,
  [constructAssetId(polimecDot)]: polimecDot.data,
  [constructAssetId(foreignAssetMYTH)]: foreignAssetMYTH.data,
};

export const polimecForeignAssetInfo = {
  [foreignAssetMYTH?.id]: foreignAssetMYTH.data,
};
