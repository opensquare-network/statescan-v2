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

const AssetLogoWrapper = styled(Wrapper)`
  position: relative;
`;

const DestroyedBadge = styled.img`
  position: absolute;
  right: 0;
  bottom: 0;
`;

export default function Symbol({ asset, destroyed }) {
  return (
    <SymbolLink
      destroyed={destroyed}
      assetId={asset?.assetId}
      assetHeight={asset?.assetHeight}
    >
      <Wrapper>
        <AssetLogoWrapper>
          <AssetLogo
            assetId={asset?.assetId}
            assetHeight={asset?.assetHeight}
          />
          {destroyed && (
            <DestroyedBadge src="/imgs/icons/asset/destroyed-badge.svg" />
          )}
        </AssetLogoWrapper>
        <Name>{asset?.metadata?.symbol ?? asset?.asset?.metadata?.symbol}</Name>
      </Wrapper>
    </SymbolLink>
  );
}
