import { Inter_14_500 } from "../../styles/text";
import styled from "styled-components";
import { Flex } from "../styled/flex";
import React from "react";

const Item = styled(Flex)`
  box-sizing: border-box;
  padding: 0 8px;
  min-width: 28px;
  height: 28px;
  border-radius: 4px;
  justify-content: center;
  ${Inter_14_500};
  color: ${(props) => props.theme.fontSecondary};
`;

export default function PageItem({ page, now }) {
  return <Item>{page + 1}</Item>;
}
