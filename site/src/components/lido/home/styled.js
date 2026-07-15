import styled, { css } from "styled-components";
import { Flex, FlexBetween } from "../../styled/flex";
import { Panel } from "../../styled/panel";
import { Inter_12_500, Inter_14_600, Inter_18_700 } from "../../../styles/text";

export const StatsPanel = styled(Panel)`
  padding: 24px;
`;

export const StatsSection = styled.div`
  min-width: 0;
`;

export const StatsPanelTitle = styled.h2`
  ${Inter_18_700};
  color: ${(p) => p.theme.fontPrimary};
  margin: 0;
`;

export const StatsSectionHeader = styled(FlexBetween)`
  gap: 16px;
  min-height: 42px;
  margin-bottom: 16px;
`;

export const StatsGrid = styled.div`
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

export const StatItem = styled(Flex)`
  align-items: flex-start;
  gap: 16px;
  min-width: 0;
`;

export const StatLabel = styled.div`
  ${Inter_12_500};
  color: ${(p) => p.theme.fontTertiary};
  min-width: 0;
  margin-bottom: 8px;
`;

export const PeriodSwitch = styled.div`
  display: inline-flex;
  padding: 4px;
  border-radius: 8px;
  background: ${(p) => p.theme.fillPanel};
  border: 1px solid ${(p) => p.theme.strokeBase};
`;

export const PeriodSwitchButton = styled.button`
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

export const SplitStatsPanel = styled(Panel)`
  padding: 8px 0 0;
`;

export const SplitStatsCards = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media screen and (max-width: 640px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const SplitStatCard = styled(Flex)`
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

export const SplitMetrics = styled.div`
  display: grid;
  grid-template-columns: minmax(72px, 0.75fr) minmax(120px, 1.25fr);
  gap: 12px;
`;

export const SplitMetric = styled.div`
  min-width: 0;

  &:last-child {
    justify-self: end;
    text-align: right;
  }
`;
