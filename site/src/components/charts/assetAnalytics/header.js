import styled, { css } from "styled-components";
import { Inter_12_600, Inter_14_600 } from "../../../styles/text";
import { ASSET_ANALYTICS_RANGE_ITEMS } from "../../../utils/constants";
import AssetLogo from "../../assetLogo";
import { Flex, FlexBetween } from "../../styled/flex";

const Wrapper = styled(FlexBetween)`
  padding: 14px 0;
`;

const RangeItem = styled.div`
  padding: 2px 6px;
  background: ${(p) => p.theme.fillSub};
  color: ${(p) => p.theme.fontSecondary};
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  text-transform: capitalize;
  ${Inter_12_600};

  ${(p) =>
    p.active &&
    css`
      background: ${(p) => p.theme.theme100};
      color: ${(p) => p.theme.theme500};
    `}
`;

const Symbol = styled.span`
  color: ${(p) => p.theme.fontPrimary};
  ${Inter_14_600};
`;

export default function AssetAnalyticsChartHeader({
  symbol,
  assetId,
  assetHeight,
  range,
  setRange,
}) {
  return (
    <Wrapper>
      <Flex gap={8}>
        <AssetLogo assetId={assetId} assetHeight={assetHeight} />
        <Symbol>{symbol}</Symbol>
      </Flex>

      <Flex gap={8}>
        {ASSET_ANALYTICS_RANGE_ITEMS.map((item) => (
          <RangeItem
            role="button"
            key={item}
            active={range === item}
            onClick={() => setRange(item)}
          >
            {item}
          </RangeItem>
        ))}
      </Flex>
    </Wrapper>
  );
}
