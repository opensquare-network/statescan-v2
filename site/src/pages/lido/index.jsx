import { useState } from "react";
import BigNumber from "bignumber.js";
import styled, { css } from "styled-components";
import ValueDisplay from "../../components/displayValue";
import AssetSquareIcon from "../../components/icons/assetSquareIcon";
import SpendPeriodSquareIcon from "../../components/icons/spendPeriodSquareIcon";
import TransferSquareIcon from "../../components/icons/transferSquareIcon";
import LoadingInlineAnimationIcon from "../../components/icons/loadingInlineAnimationIcon";
import Layout from "../../components/layout";
import { Panel } from "../../components/styled/panel";
import { useLidoDailyStatsData } from "../../hooks/lido/useLidoDailyStatsData";
import { useLidoOnchainStatsData } from "../../hooks/lido/useLidoOnchainStatsData";
import useChainSettings from "../../utils/hooks/chain/useChainSettings";
import { toLidoAmount } from "../../utils/viewFuncs/lido";
import {
  Inter_12_500,
  Inter_14_600,
  Inter_18_700,
  Inter_24_700,
} from "../../styles/text";

const PERIODS = [
  { label: "7D", value: "last7Days" },
  { label: "30D", value: "last30Days" },
];

const PageTitle = styled.h1`
  all: unset;
  margin-bottom: 24px;
  display: block;
  ${Inter_24_700};
  color: ${(props) => props.theme.fontPrimary};
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

const StatsPanel = styled(Panel)`
  padding: 8px 0 0;
`;

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

const Section = styled.div`
  margin-top: 120px;
  & + & {
    margin-top: 24px;
  }
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

const OverviewItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  min-width: 0;
`;

const IconSlot = styled.div`
  width: 40px;
  height: 40px;
  flex: 0 0 40px;
  margin-top: 0;

  > svg {
    width: 40px;
    height: 40px;
  }
`;

const CardContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const Label = styled.div`
  ${Inter_14_600};
  color: ${(p) => p.theme.fontSecondary};
  min-width: 0;
  margin-bottom: 12px;
`;

const OverviewLabel = styled(Label)`
  ${Inter_12_500};
  color: ${(p) => p.theme.fontTertiary};
  margin-bottom: 8px;
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

const MetricLabel = styled.div`
  ${Inter_12_500};
  color: ${(p) => p.theme.fontTertiary};
  margin-bottom: 4px;
`;

const MetricValue = styled.div`
  ${Inter_18_700};
  color: ${(p) => p.theme.fontPrimary};
  min-width: 0;
`;

const OnchainValueLoading = styled.span`
  display: inline-flex;
  align-items: center;
  width: 14px;
  height: 18px;
  vertical-align: -2px;

  > svg {
    display: block;
    width: 14px;
    height: 14px;
  }
`;

function Amount({ value, symbol, decimals }) {
  return (
    <ValueDisplay
      value={toLidoAmount(value, decimals)}
      symbol={symbol}
      showNotEqualTooltip
    />
  );
}

function formatCount(value) {
  return new BigNumber(value || 0).toFormat(0);
}

function formatRate(value, decimals) {
  if (value == null) {
    return "--";
  }

  return new BigNumber(value).div(new BigNumber(10).pow(decimals)).toFormat(6);
}

function OnchainAmount({ value, symbol, decimals, loading }) {
  if (loading) {
    return (
      <OnchainValueLoading>
        <LoadingInlineAnimationIcon />
      </OnchainValueLoading>
    );
  }

  if (value == null) {
    return "--";
  }

  return <Amount value={value} symbol={symbol} decimals={decimals} />;
}

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

function RateValue({ value, decimals, loading }) {
  if (loading) {
    return (
      <OnchainValueLoading>
        <LoadingInlineAnimationIcon />
      </OnchainValueLoading>
    );
  }

  return formatRate(value, decimals);
}

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

export default function LidoHome() {
  const [period, setPeriod] = useState(PERIODS[0].value);
  const chainSettings = useChainSettings();
  const { decimals, symbol } = chainSettings;
  const { data } = useLidoDailyStatsData();
  const { data: onchainData, loading: onchainLoading } =
    useLidoOnchainStatsData();
  const stats = data[period];

  return (
    <Layout>
      <PageTitle>Lido Explorer</PageTitle>

      <Section>
        <OverviewPanel>
          <OverviewGrid>
            <OverviewCard
              label="stETH Total Supply"
              icon={<AssetSquareIcon />}
              value={
                <OnchainAmount
                  value={onchainData.stEthTotalSupply}
                  decimals={decimals}
                  symbol="stETH"
                  loading={onchainLoading}
                />
              }
            />
            <OverviewCard
              label="stETH / wstETH"
              icon={<TransferSquareIcon />}
              value={
                <RateValue
                  value={onchainData.stEthPerToken}
                  decimals={decimals}
                  loading={onchainLoading}
                />
              }
            />
            <OverviewCard
              label="wstETH Total Supply"
              icon={<AssetSquareIcon />}
              value={
                <OnchainAmount
                  value={onchainData.wstEthTotalSupply}
                  decimals={decimals}
                  symbol="wstETH"
                  loading={onchainLoading}
                />
              }
            />
            <OverviewCard
              label="wstETH / stETH"
              icon={<TransferSquareIcon />}
              value={
                <RateValue
                  value={onchainData.tokensPerStEth}
                  decimals={decimals}
                  loading={onchainLoading}
                />
              }
            />
            <OverviewCard
              label="Buffered ETH"
              icon={<SpendPeriodSquareIcon />}
              value={
                <OnchainAmount
                  value={onchainData.bufferedEth}
                  decimals={decimals}
                  symbol={symbol}
                  loading={onchainLoading}
                />
              }
            />
          </OverviewGrid>
        </OverviewPanel>
      </Section>

      <Section>
        <StatsSection>
          <StatsSectionHeader>
            <StatsPanelTitle>Staking</StatsPanelTitle>
            <Switch>
              {PERIODS.map((item) => (
                <SwitchButton
                  key={item.value}
                  active={period === item.value}
                  onClick={() => setPeriod(item.value)}
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
      </Section>
    </Layout>
  );
}
