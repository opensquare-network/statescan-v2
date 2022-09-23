import React from "react";
import { ReactComponent as CaretLeft } from "../icons/caret-left.svg";
import { ReactComponent as CaretRight } from "../icons/caret-right.svg";
import Link from "../styled/link";
import styled from "styled-components";
import encodeUriQuery from "../../utils/viewFuncs";

import { useLocation } from "react-router-dom";

const StyledLink = styled(Link)`
  height: 16px;
`;

const LinkInnerWrapper = styled.div`
  display: inline-flex;
  align-items: center;
`;

export default function PageCaret({ isPre = true, page, onPageChange = null }) {
  const location = useLocation();
  return (
    <StyledLink
      to={`${location.pathname}?${encodeUriQuery({
        page,
      })}`}
    >
      <LinkInnerWrapper
        onClick={(e) => {
          onPageChange && onPageChange(e, page);
        }}
      >
        {isPre ? <CaretLeft /> : <CaretRight />}
      </LinkInnerWrapper>
    </StyledLink>
  );
}
