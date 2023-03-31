import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  flex,
  flex_col,
  gap_x,
  gap_y,
  grid,
  grid_cols,
  space_y,
  text_secondary,
} from "../styles/tailwindcss";
import { Inter_14_500 } from "../styles/text";
import useChainSettings from "../utils/hooks/chain/useChainSettings";

const List = styled.div`
  ${flex};
  ${flex_col};
  ${gap_y(8)};
  ${Inter_14_500};
  ${text_secondary};
`;

const ListItem = styled.div`
  ${grid};
  ${grid_cols(3)};
  ${gap_x(32)};
`;

export default function ExtrinsicAssetsTransferredList() {
  const { symbol } = useChainSettings();

  const [list, setList] = useState([]);

  useEffect(() => {
    setList([
      {
        from: "user",
        to: "touser",
        value: 100,
      },
      {
        from: "user2",
        to: "touser2",
        value: 1001,
      },
    ]);
  }, []);

  return (
    <List>
      {list.map((item, idx) => (
        <ListItem key={idx}>
          <span>From {item.from}</span>
          <span>To {item.to}</span>
          <span>
            For {item.value} {symbol}
          </span>
        </ListItem>
      ))}
    </List>
  );
}
