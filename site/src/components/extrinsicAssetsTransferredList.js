import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  block,
  flex,
  flex_col,
  gap_x,
  gap_y,
  grid,
  grid_cols,
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
  ${grid};
  ${grid_cols(3)};
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

// FIXME: for test
const address = "HWyLYmpW68JGJYoVJcot6JQ1CJbtUQeTdxfY1kUTsvGCB1r";

function Item({ from, to, value, symbol }) {
  return (
    <ListItemWrapper>
      <ListItemContent>
        <ListItemSubtitle>From</ListItemSubtitle>
        <AddressOrIdentity address={from} />
      </ListItemContent>
      <ListItemContent>
        <ListItemSubtitle>To</ListItemSubtitle>
        <AddressOrIdentity address={to} />
      </ListItemContent>
      <ListItemContent>
        <ListItemSubtitle>For</ListItemSubtitle>
        <div>
          {bigNumberToLocaleString(value)} {symbol}
        </div>
      </ListItemContent>
    </ListItemWrapper>
  );
}

export default function ExtrinsicAssetsTransferredList() {
  const { symbol } = useChainSettings();

  const [list, setList] = useState([]);

  // FIXME: fetch data from server
  useEffect(() => {
    setList([
      {
        from: address,
        to: address,
        value: 100,
      },
      {
        from: address,
        to: address,
        value: 1001,
      },
    ]);
  }, []);

  return (
    <List>
      {list.map((item, idx) => (
        <Item
          key={idx}
          from={item.from}
          to={item.to}
          value={item.value}
          symbol={symbol}
        />
      ))}
    </List>
  );
}
