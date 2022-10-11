import React, { useEffect } from "react";
import Link from "../styled/link";
import styled from "styled-components";
import * as queryString from "query-string";
import encodeUriQuery from "../../utils/viewFuncs";

import { useLocation } from "react-router-dom";

const StyledLink = styled(Link)`
  height: 16px;
`;

const LinkInnerWrapper = styled.div`
  display: inline-flex;
  align-items: center;
`;

export default function PageCaret({ children, page, onPageChange = null }) {
  const location = useLocation();
  const [to, setTo] = React.useState(``);

  useEffect(() => {
    setTo(
      `${location.pathname}?${encodeUriQuery({
        ...queryString.parse(location.search),
        page,
      })}`,
    );
  }, [location]);

  return (
    <StyledLink to={to}>
      <LinkInnerWrapper
        onClick={(e) => {
          onPageChange && onPageChange(e, page);
        }}
      >
        {children}
      </LinkInnerWrapper>
    </StyledLink>
  );
}
