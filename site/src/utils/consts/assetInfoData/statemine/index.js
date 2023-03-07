import { assetBfkk } from "./asset-bfkk-20";
import { assetBill } from "./asset-bill-223";
import { assetChrawnna } from "./asset-chrawnna-567";
import { assetDanger } from "./asset-danger-43";
import { assetPolarisDAO } from "./asset-polarisdao-16";
import { assetRMRK } from "./asset-rmrk-8";
import { assetUSDt } from "./asset-usdt-1984";
import { assetPNEO } from "./asset-pneo-222";

export function constructAssetId({ id, height }) {
  return `${id}_${height}`;
}

const statemineAssetInfo = {
  [constructAssetId(assetBfkk)]: assetBfkk.data,
  [constructAssetId(assetRMRK)]: assetRMRK.data,
  [constructAssetId(assetBill)]: assetBill.data,
  [constructAssetId(assetChrawnna)]: assetChrawnna.data,
  [constructAssetId(assetDanger)]: assetDanger.data,
  [constructAssetId(assetPolarisDAO)]: assetPolarisDAO.data,
  [constructAssetId(assetUSDt)]: assetUSDt.data,
  [constructAssetId(assetPNEO)]: assetPNEO.data,
};

export default statemineAssetInfo;
