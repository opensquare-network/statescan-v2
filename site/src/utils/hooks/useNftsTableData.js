import React from "react";
import { useSelector } from "react-redux";
import AddressOrIdentity from "../../components/address";
import { ColoredInterLink } from "../../components/styled/link";
import { nftListSelector } from "../../store/reducers/nftSlice";
import { getNftClassLink, getNftStatus } from "../nft";
import { time } from "../viewFuncs/time";
import Thumbnail from "../../components/nft/thumbnail";
import NftStatus from "../../components/nft/status";
import NftName from "../../components/nft/name";
import Tooltip from "../../components/tooltip";
import { TextSecondary } from "../../components/styled/text";

export function useNftsTableData({ showPreview }) {
  const list = useSelector(nftListSelector);

  if (!list?.items) {
    return null;
  }

  return list?.items?.map((nft) => {
    const { classId, parsedMetadata, details, indexer } = nft;
    const link = getNftClassLink(nft);

    return [
      <ColoredInterLink to={link}>{classId}</ColoredInterLink>,
      <Thumbnail
        image={parsedMetadata?.resource?.thumbnail}
        background={parsedMetadata?.resource?.metadata?.background}
        onClick={() => showPreview(nft)}
      />,
      <ColoredInterLink to={link}>
        <NftName name={parsedMetadata?.name} />
      </ColoredInterLink>,
      <TextSecondary>{time(indexer.blockTime)}</TextSecondary>,
      <Tooltip tip={details?.owner}>
        <AddressOrIdentity address={details?.owner} />
      </Tooltip>,
      <TextSecondary>{details?.instances || 0}</TextSecondary>,
      <NftStatus status={getNftStatus(nft)} />,
    ];
  });
}
