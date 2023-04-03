import styled from "styled-components";
import {
  block,
  flex,
  flex_col,
  gap_x,
  gap_y,
  items_center,
  p_y,
  text_secondary,
  w,
} from "../styles/tailwindcss";
import { mobilecss } from "../styles/responsive";
import { Inter_14_500 } from "../styles/text";
import useChainSettings from "../utils/hooks/chain/useChainSettings";
import { bigNumberToLocaleString } from "../utils/viewFuncs";
import AddressOrIdentity from "./address";
import { toPrecision } from "@osn/common";
import Thumbnail from "./nft/thumbnail";
import { useState } from "react";
import { NftClassPreview } from "./nft/preview";

const List = styled.div`
  ${flex};
  ${flex_col};
  ${gap_y(8)};
  ${Inter_14_500};
  ${text_secondary};
  ${p_y(12)};

  ${mobilecss(p_y(0))};
`;

const ListItemWrapper = styled.div`
  ${flex};
  ${gap_x(32)};

  ${mobilecss(block)};
`;

const ListItemContent = styled.div`
  ${flex};
  ${items_center};
  ${gap_x(8)};

  div {
    ${flex};
    ${items_center};
  }
`;

const ListItemSubtitle = styled.div`
  min-width: max-content;
  ${mobilecss(w(48))};
`;

function Item({
  from,
  to,
  balance,
  symbol,
  decimals,
  instance,
  onInstanceThumbnailClick,
}) {
  return (
    <ListItemWrapper>
      <ListItemContent>
        <ListItemSubtitle>From</ListItemSubtitle>
        <AddressOrIdentity maxWidth={93} address={from} />
      </ListItemContent>
      <ListItemContent>
        <ListItemSubtitle>To</ListItemSubtitle>
        <AddressOrIdentity maxWidth={93} address={to} />
      </ListItemContent>
      <ListItemContent>
        <ListItemSubtitle>For</ListItemSubtitle>
        {balance && (
          <div>
            {bigNumberToLocaleString(toPrecision(balance, decimals))} {symbol}
          </div>
        )}
        {instance && (
          <>
            <Thumbnail
              size={20}
              image={instance?.class?.parsedMetadata?.resource?.thumbnail}
              background={
                instance?.class?.parsedMetadata?.resource?.metadata?.background
              }
              onClick={onInstanceThumbnailClick}
            />
            <span>{instance?.class?.parsedMetadata?.name}</span>
          </>
        )}
      </ListItemContent>
    </ListItemWrapper>
  );
}

export default function ExtrinsicAssetsTransferredList({
  assetTransferredList = [],
  uniqueTransferredList = [],
}) {
  const { symbol, decimals } = useChainSettings();
  const [preview, setPreview] = useState(false);
  const [previewNft, setPreviewNft] = useState({});
  const items = [...assetTransferredList, ...uniqueTransferredList];

  return (
    <List>
      {items.map((item, idx) => (
        <Item
          key={idx}
          from={item.from}
          to={item.to}
          balance={item.balance}
          symbol={symbol}
          decimals={decimals}
          instance={item.instance}
          onInstanceThumbnailClick={() => {
            setPreview(true);
            setPreviewNft({
              ...item.instance,
              ...item.instance?.class,
            });
          }}
        />
      ))}

      <NftClassPreview
        open={preview}
        nftClass={previewNft}
        onClose={() => setPreview(false)}
      />
    </List>
  );
}
