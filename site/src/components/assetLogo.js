import styled from "styled-components";
import { useAssetInfoData } from "../utils/hooks/useAssetInfoData";

const Icon = styled.img`
  border-radius: 9999px;
`;

export default function AssetLogo({ assetId, size = 24, className }) {
  const assetInfoData = useAssetInfoData();

  return (
    <Icon
      className={className}
      width={size}
      height={size}
      src={assetInfoData[assetId]?.icon ?? "/imgs/icons/default.svg"}
      alt="logo"
    />
  );
}
