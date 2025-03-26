import styled from "styled-components";
import { useAssetInfoData } from "../utils/hooks/useAssetInfoData";

const Icon = styled.img`
  border-radius: 9999px;
`;

export default function AssetLogo({
  assetId,
  assetHeight,
  size = 24,
  className,
  foreignAsset = false,
}) {
  const assetInfoData = useAssetInfoData();
  const assetKey = foreignAsset ? assetId : `${assetId}_${assetHeight}`;

  return (
    <Icon
      className={className}
      width={size}
      height={size}
      src={assetInfoData[assetKey]?.icon ?? "/imgs/icons/default.svg"}
      alt="logo"
    />
  );
}
