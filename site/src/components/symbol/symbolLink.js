import styled from "styled-components";
import { Link } from "react-router-dom";
import { inline_flex } from "../../styles/tailwindcss";
import useChainSettings from "../../utils/hooks/chain/useChainSettings";

const MyLink = styled(Link)`
  ${inline_flex};
  color: ${(props) => props.theme.fontPrimary};
  text-decoration: none;

  &:hover {
    color: ${(p) => p.theme.theme500};
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
  foreignAsset = false,
}) {
  const chainSetting = useChainSettings();

  if (chainSetting?.modules?.assets && (assetId || assetHeight)) {
    let link = destroyed
      ? `/assets/${assetId}_${assetHeight}`
      : `/assets/${assetId}`;

    if (foreignAsset) {
      link = `/foreign-assets/${assetId}`;
    }

    return <MyLink to={link}>{children}</MyLink>;
  }

  return children;
}
