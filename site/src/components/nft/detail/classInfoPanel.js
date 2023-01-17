import { useMemo } from "react";
import { toNftClassDetailItem } from "../../../utils/viewFuncs/toDetailItem";
import InfoPanelBase from "./infoPanelBase";

export default function NftClassInfoPanel({ nftClass }) {
  const parsedMetadata = nftClass?.parsedMetadata;

  const listData = useMemo(
    () => (nftClass ? toNftClassDetailItem(nftClass) : {}),
    [nftClass],
  );

  return <InfoPanelBase parsedMetadata={parsedMetadata} listData={listData} />;
}
