import AssetSquareIcon from "../../icons/assetSquareIcon";
import SpendPeriodSquareIcon from "../../icons/spendPeriodSquareIcon";
import TransferSquareIcon from "../../icons/transferSquareIcon";
import { StatItem, StatLabel, StatsGrid, StatsPanel } from "./styled";
import {
  CardContent,
  IconSlot,
  MetricValue,
  OnchainAmount,
  RateValue,
} from "./metrics";

function OverviewCard({ label, value, icon }) {
  return (
    <StatItem>
      <IconSlot>{icon}</IconSlot>
      <CardContent>
        <StatLabel>{label}</StatLabel>
        <MetricValue>{value}</MetricValue>
      </CardContent>
    </StatItem>
  );
}

export default function LidoOverview({ data, decimals, symbol, loading }) {
  return (
    <StatsPanel>
      <StatsGrid>
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
      </StatsGrid>
    </StatsPanel>
  );
}
