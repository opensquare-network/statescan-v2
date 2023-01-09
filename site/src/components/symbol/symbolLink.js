import styled from "styled-components";
import { Link } from "react-router-dom";

const MyLink = styled(Link)`
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
    ? `/asset/${assetId}_${assetHeight}`
    : `/asset/${assetId}`;
  return <MyLink to={link}>{children}</MyLink>;
}
