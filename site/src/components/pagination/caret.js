import React, { useEffect } from "react";
import Link from "../styled/link";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

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

export default function PageCaret({ children, page, onPageChange = null }) {
  const location = useLocation();
  const [to, setTo] = React.useState("");

  useEffect(() => {
    let search = location.search;
    search = search.replace(/[?&]page=[^&]*/g, "");
    if (search && !search.startsWith("?")) {
      search = "?" + search;
    }

    const separator = search && search !== "?" ? "&" : "?";
    const newSearch = `${search}${separator}page=${encodeURIComponent(page)}`;

    setTo(`${location.pathname}${newSearch}`);
  }, [location, page]);

  return (
    <StyledLink
      to={to}
      onClick={(e) => {
        onPageChange && onPageChange(e, page);
      }}
    >
      <LinkInnerWrapper>{children}</LinkInnerWrapper>
    </StyledLink>
  );
}
