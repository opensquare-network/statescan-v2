import React from "react";
import Link from "../styled/link";
import styled, { css } from "styled-components";
import encodeUriQuery from "../../utils/viewFuncs";
import { Flex } from "../styled/flex";
import { Inter_14_500 } from "../../styles/text";

const Item = styled(Flex)`
  box-sizing: border-box;
  padding: 0 8px;
  cursor: pointer;
  min-width: 28px;
  height: 28px;
  border-radius: 4px;
  justify-content: center;
  ${Inter_14_500};
  color: ${(props) => props.theme.fontSecondary};

  :hover {
    color: ${(props) => props.theme.theme500};
  }

  ${(p) =>
    p.active &&
    css`
      background: ${(props) => props.theme.theme100};
      color: ${(props) => props.theme.theme500};
      cursor: auto;
      pointer-events: none;
    `}
`;

export default function PageItem({ page, now, onPageChange = null }) {
  return (
    <Link
      key={page}
      to={`?${encodeUriQuery({
        ...{},
        page: page + 1,
      })}`}
    >
      <Item
        active={parseInt(now) === parseInt(page + 1)}
        onClick={(e) => {
          onPageChange && onPageChange(e, page + 1);
        }}
      >
        {page + 1}
      </Item>
    </Link>
  );
}
