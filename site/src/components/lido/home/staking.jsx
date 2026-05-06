import styled, { css } from "styled-components";
import AssetSquareIcon from "../../icons/assetSquareIcon";
import TransferSquareIcon from "../../icons/transferSquareIcon";
import { Panel } from "../../styled/panel";
import { Inter_14_600, Inter_18_700 } from "../../../styles/text";
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

const StatsPanel = styled(Panel)`
  padding: 8px 0 0;
`;

const StatsSection = styled.div`
  min-width: 0;
`;

const StatsPanelTitle = styled.h2`
  ${Inter_18_700};
  color: ${(p) => p.theme.fontPrimary};
  margin: 0;
`;

const StatsSectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 42px;
  margin-bottom: 16px;
`;

const Switch = styled.div`
  display: inline-flex;
  padding: 4px;
  border-radius: 8px;
  background: ${(p) => p.theme.fillPanel};
  border: 1px solid ${(p) => p.theme.strokeBase};
`;

const SwitchButton = styled.button`
  ${Inter_14_600};
  padding: 6px 14px;
  border: none;
  border-radius: 6px;
  color: ${(p) => p.theme.fontSecondary};
  background: transparent;
  cursor: pointer;

  ${(p) =>
    p.active &&
    css`
      color: ${p.theme.fontPrimary};
      background: ${p.theme.fillPopupHover};
    `}
`;

const StatsCards = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media screen and (max-width: 640px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const Card = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  min-width: 0;
  min-height: 96px;
  padding: 20px 24px;
  border-left: 1px solid ${(p) => p.theme.strokeBase};

  &:first-child {
    border-left: none;
  }

  @media screen and (max-width: 640px) {
    border-left: none;
    border-bottom: 1px solid ${(p) => p.theme.strokeBase};

    &:last-child {
      border-bottom: none;
    }
  }
`;

const Metrics = styled.div`
  display: grid;
  grid-template-columns: minmax(72px, 0.75fr) minmax(120px, 1.25fr);
  gap: 12px;
`;

const Metric = styled.div`
  min-width: 0;

  &:last-child {
    justify-self: end;
    text-align: right;
  }
`;

function StatCard({ label, count, value, icon, decimals, symbol }) {
  return (
    <Card>
      <IconSlot>{icon}</IconSlot>
      <CardContent>
        <Label>{label}</Label>
        <Metrics>
          <Metric>
            <MetricLabel>Count</MetricLabel>
            <MetricValue>{formatCount(count)}</MetricValue>
          </Metric>
          <Metric>
            <MetricLabel>Amount</MetricLabel>
            <MetricValue>
              <Amount value={value} decimals={decimals} symbol={symbol} />
            </MetricValue>
          </Metric>
        </Metrics>
      </CardContent>
    </Card>
  );
}

export default function LidoStakingActivity({
  period,
  onPeriodChange,
  stats,
  decimals,
  symbol,
}) {
  return (
    <StatsSection>
      <StatsSectionHeader>
        <StatsPanelTitle>Staking</StatsPanelTitle>
        <Switch>
          {PERIODS.map((item) => (
            <SwitchButton
              key={item.value}
              active={period === item.value}
              onClick={() => onPeriodChange(item.value)}
            >
              {item.label}
            </SwitchButton>
          ))}
        </Switch>
      </StatsSectionHeader>
      <StatsPanel>
        <StatsCards>
          <StatCard
            label="Deposits"
            count={stats.depositCount}
            value={stats.depositValue}
            icon={<AssetSquareIcon />}
            decimals={decimals}
            symbol={symbol}
          />
          <StatCard
            label="Withdrawal"
            count={stats.withdrawalRequestCount}
            value={stats.withdrawalRequestValue}
            icon={<TransferSquareIcon />}
            decimals={decimals}
            symbol={symbol}
          />
        </StatsCards>
      </StatsPanel>
    </StatsSection>
  );
}
