import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  flex,
  flex_col,
  gap_x,
  gap_y,
  grid,
  grid_cols,
  items_center,
  text_secondary,
} from "../styles/tailwindcss";
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
`;

const ListItemWrapper = styled.div`
  ${grid};
  ${grid_cols(3)};
  ${gap_x(32)};
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

// FIXME: for test
const address = "HWyLYmpW68JGJYoVJcot6JQ1CJbtUQeTdxfY1kUTsvGCB1r";

function Item({ from, to, value, symbol }) {
  return (
    <ListItemWrapper>
      <ListItemContent>
        <div>From</div>
        <AddressOrIdentity address={from} />
      </ListItemContent>
      <ListItemContent>
        <div>To</div>
        <AddressOrIdentity address={to} />
      </ListItemContent>
      <ListItemContent>
        <div>For</div>
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
