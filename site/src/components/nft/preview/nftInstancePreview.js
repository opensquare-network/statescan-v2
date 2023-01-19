import {
  getNftInstanceLink,
  getNftInstanceParsedMetadata,
} from "../../../utils/nft";
import NftPreviewBase from "./previewBase";

export default function NftClassPreview({
  open,
  nftClass,
  nftInstance,
  onClose,
}) {
  const parsedMetadata = getNftInstanceParsedMetadata(nftClass, nftInstance);
  const detailLink = getNftInstanceLink(nftClass, nftInstance);

  return (
    <NftPreviewBase
      open={open}
      onClose={onClose}
      indexer={nftInstance?.indexer}
      details={nftInstance?.details}
      parsedMetadata={parsedMetadata}
      detailLink={detailLink}
    />
  );
}
