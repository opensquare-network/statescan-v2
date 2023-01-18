import { useMemo } from "react";
import { toNftInstanceDetailItem } from "../../../utils/viewFuncs/toDetailItem";
import InfoPanelBase from "./infoPanelBase";

export default function NftInstanceInfoPanel({ nftClass, nftInstance }) {
  const listData = useMemo(
    () =>
      nftClass && nftInstance
        ? toNftInstanceDetailItem(nftClass, nftInstance)
        : {},
    [nftClass, nftInstance],
  );

  const parsedMetadata =
    nftInstance?.parsedMetadata || nftClass?.parsedMetadata;

  return <InfoPanelBase parsedMetadata={parsedMetadata} listData={listData} />;
}
