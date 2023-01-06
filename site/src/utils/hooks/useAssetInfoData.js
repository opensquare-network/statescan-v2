import { useSelector } from "react-redux";
import { assetDetailSelector } from "../../store/reducers/assetSlice";
import { chainSelector } from "../../store/reducers/settingSlice";
import assetInfoData from "../consts/assetInfoData";

/**
 * @description return all asset info data
 */
export function useAssetInfoData() {
  const chain = useSelector(chainSelector);
  const assetInfo = assetInfoData[chain] ?? {};

  return assetInfo;
}

/**
 * @description use in asset detail page
 */
export function useAssetInfoDataDetail() {
  const detail = useSelector(assetDetailSelector);
  const assetInfoData = useAssetInfoData();
  const data = assetInfoData[detail?.assetId] ?? {};

  return data;
}
