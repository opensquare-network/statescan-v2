import AssetSquareIcon from "../../icons/assetSquareIcon";
import TransferSquareIcon from "../../icons/transferSquareIcon";
import LoadableContent from "../../loadings/loadableContent";
import {
  PeriodSwitch,
  PeriodSwitchButton,
  SplitMetric,
  SplitMetrics,
  SplitStatCard,
  SplitStatsCards,
  SplitStatsPanel,
  StatsPanelTitle,
  StatsSection,
  StatsSectionHeader,
} from "./styled";
import {
  Amount,
  CardContent,
  formatCount,
  IconSlot,
  Label,
  MetricLabel,
  MetricValue,
} from "./metrics";

export const PERIODS = [
  { label: "7D", value: "last7Days" },
  { label: "30D", value: "last30Days" },
];

function StatCard({ label, count, value, icon, decimals, symbol, loading }) {
  return (
    <SplitStatCard>
      <IconSlot>{icon}</IconSlot>
      <CardContent>
        <Label>{label}</Label>
        <SplitMetrics>
          <SplitMetric>
            <MetricLabel>Count</MetricLabel>
            <MetricValue>
              <LoadableContent loading={loading}>
                {formatCount(count)}
              </LoadableContent>
            </MetricValue>
          </SplitMetric>
          <SplitMetric>
            <MetricLabel>Amount</MetricLabel>
            <MetricValue>
              <LoadableContent loading={loading}>
                <Amount value={value} decimals={decimals} symbol={symbol} />
              </LoadableContent>
            </MetricValue>
          </SplitMetric>
        </SplitMetrics>
      </CardContent>
    </SplitStatCard>
  );
}

export default function LidoUserStaking({
  period,
  onPeriodChange,
  stats,
  loading,
  decimals,
  symbol,
}) {
  return (
    <StatsSection>
      <StatsSectionHeader>
        <StatsPanelTitle>User Staking</StatsPanelTitle>
        <PeriodSwitch>
          {PERIODS.map((item) => (
            <PeriodSwitchButton
              key={item.value}
              active={period === item.value}
              onClick={() => onPeriodChange(item.value)}
            >
              {item.label}
            </PeriodSwitchButton>
          ))}
        </PeriodSwitch>
      </StatsSectionHeader>
      <SplitStatsPanel>
        <SplitStatsCards>
          <StatCard
            label="Deposits"
            count={stats.depositCount}
            value={stats.depositValue}
            icon={<AssetSquareIcon />}
            decimals={decimals}
            symbol={symbol}
            loading={loading}
          />
          <StatCard
            label="Withdrawals"
            count={stats.withdrawalRequestCount}
            value={stats.withdrawalRequestValue}
            icon={<TransferSquareIcon />}
            decimals={decimals}
            symbol={symbol}
            loading={loading}
          />
        </SplitStatsCards>
      </SplitStatsPanel>
    </StatsSection>
  );
}
