import { useSelector } from "react-redux";
import { assetDetailSelector } from "../../store/reducers/assetSlice";
import { chainSelector } from "../../store/reducers/settingSlice";
import assetInfoData from "../consts/assetInfoData";

export function useAssetInfoData() {
  const chain = useSelector(chainSelector);
  const detail = useSelector(assetDetailSelector);

  const assetInfo = assetInfoData[chain];

  const aboutData = assetInfo[detail.assetId] ?? {};

  return aboutData;
}
