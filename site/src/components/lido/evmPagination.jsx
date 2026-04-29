import styled, { css } from "styled-components";
import { useLocation } from "react-router-dom";
import * as queryString from "query-string";
import Link from "../styled/link";
import { Flex } from "../styled/flex";
import { ReactComponent as CaretLeft } from "../icons/caret-left.svg";
import { ReactComponent as CaretRight } from "../icons/caret-right.svg";

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

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  width: 28px;
  height: 28px;
`;

const LinkInnerWrapper = styled.div`
  display: inline-flex;
  align-items: center;
`;

function getBaseParams(params) {
  const result = { ...params };

  delete result.cursor;
  delete result.prev;
  delete result.page;

  return result;
}

function getPrevLink(pathname, currentParams) {
  const params = getBaseParams(currentParams);
  const prev = currentParams.prev;

  if (prev) {
    params.cursor = prev;
  }

  return queryString.stringifyUrl({ url: pathname, query: params });
}

function getNextLink(pathname, currentParams, nextCursor) {
  const params = getBaseParams(currentParams);
  const cursor = currentParams.cursor;
  params.cursor = nextCursor;

  if (cursor) {
    params.prev = cursor;
  }

  return queryString.stringifyUrl({ url: pathname, query: params });
}

function EvmPageCaret({ children, to }) {
  return (
    <StyledLink to={to}>
      <LinkInnerWrapper>{children}</LinkInnerWrapper>
    </StyledLink>
  );
}

export default function EvmPagination({
  nextCursor,
}) {
  const location = useLocation();
  const params = queryString.parse(location.search);
  const cursor = params.cursor;
  const prevLink = getPrevLink(location.pathname, params);
  const nextLink = getNextLink(location.pathname, params, nextCursor);

  return (
    <Wrapper>
      <Nav disabled={!cursor}>
        <EvmPageCaret to={prevLink}>
          <CaretLeft />
        </EvmPageCaret>
      </Nav>
      <Nav disabled={!nextCursor}>
        <EvmPageCaret to={nextLink}>
          <CaretRight />
        </EvmPageCaret>
      </Nav>
    </Wrapper>
  );
}
