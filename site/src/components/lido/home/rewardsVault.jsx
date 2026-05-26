import styled from "styled-components";
import AssetSquareIcon from "../../icons/assetSquareIcon";
import CaretUprightIcon from "../../icons/caretUpright";
import TransferSquareIcon from "../../icons/transferSquareIcon";
import { StyledExternalLink } from "../../externalLinkWithCopy";
import Link from "../../styled/link";
import LoadableContent from "../../loadings/loadableContent";
import Tooltip from "../../tooltip";
import { LIDO_REWARDS_VAULT_ADDRESS } from "../../../services/evm/lido";
import { Inter_12_500, Inter_14_500 } from "../../../styles/text";
import { getEtherscanAddressUrl } from "../../../utils/viewFuncs/lido";
import {
  StatItem,
  StatLabel as BaseStatLabel,
  StatsGrid,
  StatsPanel,
  StatsPanelTitle,
  StatsSection,
  StatsSectionHeader,
} from "./styled";
import {
  Amount,
  CardContent,
  formatCount,
  IconSlot,
  MetricValue,
} from "./metrics";

const VaultStatLabel = styled(BaseStatLabel)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  width: 100%;
`;

const AddressLink = styled(StyledExternalLink)`
  ${Inter_12_500};
  display: inline-flex;
  align-items: center;
  gap: 2px;
  color: ${(p) => p.theme.theme500};
  word-break: normal;

  &:hover {
    text-decoration: underline;
  }
`;

const ExternalLinkIcon = styled(CaretUprightIcon)`
  width: 12px;
  height: 12px;

  path {
    stroke: ${(p) => p.theme.theme500};
    stroke-opacity: 1;
  }
`;

const ViewAllLink = styled(Link)`
  ${Inter_14_500};
  color: ${(p) => p.theme.theme500};
  text-decoration: none;
`;

function AmountCard({
  label,
  value,
  icon,
  decimals,
  symbol,
  loading,
  labelExtra,
}) {
  return (
    <StatItem>
      <IconSlot>{icon}</IconSlot>
      <CardContent>
        <VaultStatLabel>
          {label}
          {labelExtra}
        </VaultStatLabel>
        <MetricValue>
          <LoadableContent loading={loading}>
            <Amount value={value} decimals={decimals} symbol={symbol} />
          </LoadableContent>
        </MetricValue>
      </CardContent>
    </StatItem>
  );
}

function CountCard({ label, value, icon, loading }) {
  return (
    <StatItem>
      <IconSlot>{icon}</IconSlot>
      <CardContent>
        <VaultStatLabel>{label}</VaultStatLabel>
        <MetricValue>
          <LoadableContent loading={loading}>{value}</LoadableContent>
        </MetricValue>
      </CardContent>
    </StatItem>
  );
}

function RewardsVaultAddressLink() {
  return (
    <Tooltip tip={LIDO_REWARDS_VAULT_ADDRESS} style={{ marginLeft: null }}>
      <AddressLink href={getEtherscanAddressUrl(LIDO_REWARDS_VAULT_ADDRESS)}>
        Addr <ExternalLinkIcon />
      </AddressLink>
    </Tooltip>
  );
}

export default function LidoRewardsVaultStats({
  stats,
  loading,
  balance,
  balanceLoading,
  decimals,
  symbol,
}) {
  return (
    <StatsSection>
      <StatsSectionHeader>
        <StatsPanelTitle>Execution Layer Reward Vault</StatsPanelTitle>
        <ViewAllLink to="/vaults/rewards">View All</ViewAllLink>
      </StatsSectionHeader>
      <StatsPanel>
        <StatsGrid>
          <AmountCard
            label="Current Balance"
            value={balance}
            icon={<AssetSquareIcon />}
            decimals={decimals}
            symbol={symbol}
            loading={balanceLoading}
            labelExtra={<RewardsVaultAddressLink />}
          />
          <AmountCard
            label="Total withdrawal"
            value={stats.value}
            icon={<TransferSquareIcon />}
            decimals={decimals}
            symbol={symbol}
            loading={loading}
          />
          <CountCard
            label="Total withdrawal count"
            icon={<TransferSquareIcon />}
            value={formatCount(stats.count)}
            loading={loading}
          />
        </StatsGrid>
      </StatsPanel>
    </StatsSection>
  );
}
