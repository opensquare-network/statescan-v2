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

export default function SymbolLink({ children, assetId, assetHeight }) {
  return <MyLink to={`/asset/${assetId}_${assetHeight}`}>{children}</MyLink>;
}
