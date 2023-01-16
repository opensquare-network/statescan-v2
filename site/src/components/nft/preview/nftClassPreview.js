import { getNftClassLink } from "../../../utils/nft";
import NftPreviewBase from "./previewBase";

export default function NftClassPreview({ open, nftClass, onClose }) {
  const detailLink = getNftClassLink(nftClass);

  return (
    <NftPreviewBase
      open={open}
      onClose={onClose}
      indexer={nftClass?.indexer}
      details={nftClass?.details}
      parsedMetadata={nftClass?.parsedMetadata}
      detailLink={detailLink}
    />
  );
}
