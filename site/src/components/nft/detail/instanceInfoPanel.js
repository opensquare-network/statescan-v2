import { useMemo } from "react";
import { getNftInstanceParsedMetadata } from "../../../utils/nft";
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

  const parsedMetadata = getNftInstanceParsedMetadata(nftClass, nftInstance);

  return <InfoPanelBase parsedMetadata={parsedMetadata} listData={listData} />;
}
