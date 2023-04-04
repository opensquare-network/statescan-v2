import styled from "styled-components";
import {
  bg_transparent,
  block,
  border_hidden,
  flex,
  flex_col,
  gap_x,
  gap_y,
  items_center,
  m_t,
  p_y,
  text_secondary,
  text_theme,
  w,
  p,
  cursor_pointer,
  w_full,
  truncate,
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
import noop from "lodash.noop";

const Wrapper = styled.div`
  ${w_full};
  ${p_y(12)};

  ${mobilecss(p_y(0))};
`;

const ListWrapper = styled.div`
  ${flex};
  ${flex_col};
  ${gap_y(8)};
  ${Inter_14_500};
  ${text_secondary};

  & + & {
    ${m_t(8)};
  }
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
  min-width: 136px;

  div {
    ${flex};
    ${items_center};
  }
`;

const ListItemSubtitle = styled.div`
  min-width: max-content;
  ${mobilecss(w(48))};
`;

const NFTName = styled.span`
  ${truncate};
`;

const ToggleListButton = styled.button`
  ${m_t(16)};
  ${border_hidden};
  ${text_theme("theme500")};
  ${bg_transparent};
  ${Inter_14_500};
  ${p(0)};
  ${cursor_pointer};
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
            <NFTName>{instance?.class?.parsedMetadata?.name}</NFTName>
          </>
        )}
      </ListItemContent>
    </ListItemWrapper>
  );
}

function List({ items, setPreview = noop, setPreviewNft = noop }) {
  const { symbol, decimals } = useChainSettings();

  return (
    <ListWrapper>
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
            setPreviewNft(item.instance?.class);
          }}
        />
      ))}
    </ListWrapper>
  );
}

const SLICE_COUNT = 10;

export default function ExtrinsicAssetsTransferredList({
  assetTransferredList = [],
  uniqueTransferredList = [],
}) {
  const [preview, setPreview] = useState(false);
  const [previewNft, setPreviewNft] = useState({});
  const [extraListVisible, setExtraListVisible] = useState(false);

  const items = [...assetTransferredList, ...uniqueTransferredList];

  return (
    <Wrapper>
      <List
        items={items.slice(0, SLICE_COUNT)}
        setPreview={setPreview}
        setPreviewNft={setPreviewNft}
      />

      {items.length > 10 && (
        <>
          {extraListVisible && (
            <List
              items={items.slice(SLICE_COUNT)}
              setPreview={setPreview}
              setPreviewNft={setPreviewNft}
            />
          )}
          <ToggleListButton onClick={() => setExtraListVisible((v) => !v)}>
            {extraListVisible ? "Hide" : "View all"}
          </ToggleListButton>
        </>
      )}

      <NftClassPreview
        open={preview}
        nftClass={previewNft}
        onClose={() => setPreview(false)}
      />
    </Wrapper>
  );
}
