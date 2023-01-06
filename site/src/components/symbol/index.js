import styled from "styled-components";
import { Inter_14_600 } from "../../styles/text";
import AssetLogo from "../assetLogo";
import SymbolLink from "./symbolLink";

const Wrapper = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

const Name = styled.span`
  color: ${(p) => p.theme.fontPrimary};
  ${Inter_14_600};
`;

export default function Symbol({ asset }) {
  return (
    <SymbolLink assetId={asset?.assetId} assetHeight={asset?.assetHeight}>
      <Wrapper>
        <AssetLogo assetId={asset?.assetId} />
        <Name>{asset?.metadata?.symbol}</Name>
      </Wrapper>
    </SymbolLink>
  );
}
