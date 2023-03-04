import React from "react";
import styled, { css } from "styled-components";
import PageCaret from "./caret";
import Items from "./items";
import { Flex } from "../styled/flex";
import { ReactComponent as CaretLeft } from "../icons/caret-left.svg";
import { ReactComponent as CaretRight } from "../icons/caret-right.svg";
import { ReactComponent as CaretDoubleLeft } from "../icons/caret-first.svg";
import { ReactComponent as CaretDoubleRight } from "../icons/caret-last.svg";
import { PC } from "../styled/responsive";
import isNil from "lodash.isnil";

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
  border-radius: 4px;
  justify-content: center;

  background: ${(props) => props.theme.fillBase};

  svg path {
    stroke: ${(props) => props.theme.fontSecondary};
  }

  :hover {
    background: ${(props) => props.theme.theme100};
    svg path {
      stroke: ${(props) => props.theme.theme500};
    }
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
  const hasTotal = !isNil(total);
  let totalPages;
  if (hasTotal) {
    totalPages = Math.ceil(total / pageSize) ? Math.ceil(total / pageSize) : 1;
  }

  const prevPage = Math.max(1, page - 1);
  const nextPage = isNil(totalPages)
    ? page + 1
    : Math.min(totalPages, page + 1);

  return (
    <Wrapper>
      <PC>
        <Nav disabled={page === 1}>
          <PageCaret page={1} onPageChange={onPageChange}>
            <CaretDoubleLeft />
          </PageCaret>
        </Nav>
      </PC>
      <Nav disabled={page === 1}>
        <PageCaret page={prevPage} onPageChange={onPageChange}>
          <CaretLeft />
        </PageCaret>
      </Nav>
      <Items
        page={page}
        total={isNil(totalPages) ? null : totalPages - 1}
        onPageChange={onPageChange}
      />
      <Nav disabled={page === totalPages}>
        <PageCaret page={nextPage} onPageChange={onPageChange}>
          <CaretRight />
        </PageCaret>
      </Nav>
      <PC>
        <Nav disabled={page === totalPages || !hasTotal}>
          <PageCaret page={totalPages} onPageChange={onPageChange}>
            <CaretDoubleRight />
          </PageCaret>
        </Nav>
      </PC>
    </Wrapper>
  );
}
