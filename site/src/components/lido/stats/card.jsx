import styled from "styled-components";
import LoadableContent from "../../loadings/loadableContent";
import { ColoredInterLink } from "../../styled/link";
import { StatItem } from "../home/styled";
import { CardContent, IconSlot, Label, MetricValue } from "../home/metrics";
import { Inter_18_700 } from "../../../styles/text";

export const StatCardLabel = styled(Label)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  width: 100%;
`;

export const StatsCardSection = styled.div`
  margin: 24px 0 32px;
`;

export const StatsMetricLink = styled(ColoredInterLink)`
  ${Inter_18_700};
`;

export default function LidoStatsCard({
  label,
  value,
  icon,
  loading,
  labelExtra,
  valueLoading = true,
}) {
  return (
    <StatItem>
      <IconSlot>{icon}</IconSlot>
      <CardContent>
        <StatCardLabel>
          {label}
          {labelExtra}
        </StatCardLabel>
        <MetricValue>
          {valueLoading ? (
            <LoadableContent loading={loading}>{value}</LoadableContent>
          ) : (
            value
          )}
        </MetricValue>
      </CardContent>
    </StatItem>
  );
}
