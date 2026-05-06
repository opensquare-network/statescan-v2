import styled from "styled-components";
import AssetSquareIcon from "../../icons/assetSquareIcon";
import SpendPeriodSquareIcon from "../../icons/spendPeriodSquareIcon";
import TransferSquareIcon from "../../icons/transferSquareIcon";
import { Panel } from "../../styled/panel";
import { Inter_12_500 } from "../../../styles/text";
import {
  CardContent,
  IconSlot,
  MetricValue,
  OnchainAmount,
  RateValue,
} from "./metrics";

const OverviewPanel = styled(Panel)`
  padding: 24px;
`;

const OverviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  row-gap: 32px;
  column-gap: 72px;

  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 32px;
  }

  @media screen and (max-width: 640px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const OverviewItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  min-width: 0;
`;

const OverviewLabel = styled.div`
  ${Inter_12_500};
  color: ${(p) => p.theme.fontTertiary};
  min-width: 0;
  margin-bottom: 8px;
`;

function OverviewCard({ label, value, icon }) {
  return (
    <OverviewItem>
      <IconSlot>{icon}</IconSlot>
      <CardContent>
        <OverviewLabel>{label}</OverviewLabel>
        <MetricValue>{value}</MetricValue>
      </CardContent>
    </OverviewItem>
  );
}

export default function LidoOverview({ data, decimals, symbol, loading }) {
  return (
    <OverviewPanel>
      <OverviewGrid>
        <OverviewCard
          label="stETH Total Supply"
          icon={<AssetSquareIcon />}
          value={
            <OnchainAmount
              value={data.stEthTotalSupply}
              decimals={decimals}
              symbol="stETH"
              loading={loading}
            />
          }
        />
        <OverviewCard
          label="wstETH Total Supply"
          icon={<AssetSquareIcon />}
          value={
            <OnchainAmount
              value={data.wstEthTotalSupply}
              decimals={decimals}
              symbol="wstETH"
              loading={loading}
            />
          }
        />
        <OverviewCard
          label="Buffered ETH"
          icon={<SpendPeriodSquareIcon />}
          value={
            <OnchainAmount
              value={data.bufferedEth}
              decimals={decimals}
              symbol={symbol}
              loading={loading}
            />
          }
        />
        <OverviewCard
          label="stETH / wstETH"
          icon={<TransferSquareIcon />}
          value={
            <RateValue
              value={data.stEthPerToken}
              decimals={decimals}
              loading={loading}
            />
          }
        />
        <OverviewCard
          label="wstETH / stETH"
          icon={<TransferSquareIcon />}
          value={
            <RateValue
              value={data.tokensPerStEth}
              decimals={decimals}
              loading={loading}
            />
          }
        />
      </OverviewGrid>
    </OverviewPanel>
  );
}
