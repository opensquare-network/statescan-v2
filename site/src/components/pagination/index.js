import React from "react";
import styled, { css } from "styled-components";
import PageCaret from "./caret";
import Items from "./items";
import { Flex } from "../styled/flex";

const Wrapper = styled(Flex)`
  padding-right: 24px;
  justify-content: end;
  height: 60px;

  > :not(:first-child) {
    margin-left: 8px;
  }
`;

const Nav = styled(Flex)`
  cursor: pointer;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  justify-content: center;

  background: ${(props) => props.theme.fillBase};

  svg path {
    stroke: ${(props) => props.theme.fontSecondary};
  }

  :hover {
    background: ${(props) => props.theme.grey100Bg};
  }

  ${(p) =>
    p.disabled &&
    css`
      cursor: auto;
      pointer-events: none;

      svg path {
        stroke: ${(props) => props.theme.fontQuaternary};
        stroke-opacity: 1;
      }

      :hover {
        background: none;
      }
    `}
`;

export default function Pagination({
  page,
  pageSize,
  total,
  onPageChange = null,
}) {
  const totalPages = Math.ceil(total / pageSize)
    ? Math.ceil(total / pageSize)
    : 1;

  const prevPage = Math.max(1, page - 1);
  const nextPage = Math.min(totalPages, page + 1);

  return (
    <Wrapper>
      <Nav disabled={page === 1}>
        <PageCaret isPre={true} page={prevPage} onPageChange={onPageChange} />
      </Nav>
      <Items page={page} total={totalPages - 1} onPageChange={onPageChange} />
      <Nav disabled={page === totalPages}>
        <PageCaret isPre={false} page={nextPage} onPageChange={onPageChange} />
      </Nav>
    </Wrapper>
  );
}
