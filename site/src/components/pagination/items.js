import constructGroups from "../../utils/viewFuncs/pagination";
import React, { Fragment } from "react";
import PageItem from "./item";
import styled from "styled-components";
import { Inter_14_500 } from "../../styles/text";

const Ellipsis = styled.div`
  ${Inter_14_500};
  color: ${(props) => props.theme.fontSecondary};
`;

export default function Items({ total = 0, page, onPageChange = null }) {
  let key = 0;
  const items = [];
  const groups = constructGroups(total, page - 1);
  for (let i = 0; i < groups.length; i++) {
    const group = groups[i];
    for (let j = 0; j < group.length; j++) {
      items.push(
        <PageItem
          now={page}
          page={group[j]}
          key={key++}
          onPageChange={onPageChange}
        />,
      );
    }

    if (i < groups.length - 1) {
      items.push(<Ellipsis key={key++}>...</Ellipsis>);
    }
  }

  return <Fragment>{items}</Fragment>;
}
