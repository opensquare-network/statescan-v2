import { constructAssetId } from "../statemine";
import polimecUSDt from "./usdt-1984";
import polimecUSDC from "./usdc-1337";

const polimecAssetInfo = {
  [constructAssetId(polimecUSDt)]: polimecUSDt.data,
  [constructAssetId(polimecUSDC)]: polimecUSDC.data,
};

export default polimecAssetInfo;
