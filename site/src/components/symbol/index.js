import styled from "styled-components";
import { Inter_14_600 } from "../../styles/text";
import SymbolLink from "./symbolLink";

const Wrapper = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const Name = styled.span`
  color: ${(p) => p.theme.fontPrimary};
  ${Inter_14_600};
`;

export default function Symbol({ asset }) {
  return (
    <SymbolLink assetId={asset?.assetId} assetHeight={asset?.assetHeight}>
      <Wrapper>
        <Icon
          src={asset?.detail?.icon ?? "/imgs/icons/default.svg"}
          alt="logo"
        />
        <Name>{asset?.metadata?.symbol}</Name>
      </Wrapper>
    </SymbolLink>
  );
}
