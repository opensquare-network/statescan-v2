import { Inter_14_500 } from "../../styles/text";
import React, { Fragment } from "react";
import styled from "styled-components";
import PageItem from "./item";

const Ellipsis = styled.div`
  ${Inter_14_500};
  color: ${(props) => props.theme.fontTertiary};
`;

export default function Items({ total = 0, page }) {
  let key = 0;
  const items = [];

  items.push(<PageItem now={page} page={page - 1} key={key++} />);

  items.push(<Ellipsis key={key++}>of</Ellipsis>);

  items.push(<PageItem now={page} page={total} key={key++} />);

  return <Fragment>{items}</Fragment>;
}
