import styled from "styled-components";
import { Link } from "react-router-dom";
import { inline_flex } from "../../styles/tailwindcss";

const MyLink = styled(Link)`
  ${inline_flex};
  color: ${(props) => props.theme.fontPrimary};
  text-decoration: none;

  &:hover {
    span {
      color: ${(p) => p.theme.theme500};
    }
  }
`;

export default function SymbolLink({
  children,
  assetId,
  assetHeight,
  destroyed = false,
}) {
  const link = destroyed
    ? `/assets/${assetId}_${assetHeight}`
    : `/assets/${assetId}`;
  return <MyLink to={link}>{children}</MyLink>;
}
