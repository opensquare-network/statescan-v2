import styled from "styled-components";
import AssetSquareIcon from "../../icons/assetSquareIcon";
import CaretUprightIcon from "../../icons/caretUpright";
import TransferSquareIcon from "../../icons/transferSquareIcon";
import { StyledExternalLink } from "../../externalLinkWithCopy";
import Link from "../../styled/link";
import Tooltip from "../../tooltip";
import LoadableContent from "../../loadings/loadableContent";
import LidoStatsCard from "../stats/card";
import { LIDO_WITHDRAWAL_VAULT_ADDRESS } from "../../../services/evm/lido";
import { Inter_12_500, Inter_14_500 } from "../../../styles/text";
import { getEtherscanAddressUrl } from "../../../utils/viewFuncs/lido";
import {
  StatsGrid,
  StatsPanel,
  StatsPanelTitle,
  StatsSection,
  StatsSectionHeader,
} from "./styled";
import { Amount, formatCount } from "./metrics";

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

function WithdrawalVaultAddressLink() {
  return (
    <Tooltip tip={LIDO_WITHDRAWAL_VAULT_ADDRESS} style={{ marginLeft: null }}>
      <AddressLink href={getEtherscanAddressUrl(LIDO_WITHDRAWAL_VAULT_ADDRESS)}>
        Addr <ExternalLinkIcon />
      </AddressLink>
    </Tooltip>
  );
}

export default function LidoWithdrawalVaultStats({
  stats,
  loading,
  balance,
  balanceLoading,
  decimals,
  symbol,
}) {
  const totalWithdrawalValue = stats?.value;
  const totalWithdrawalCount = stats?.count;

  return (
    <StatsSection>
      <StatsSectionHeader>
        <StatsPanelTitle>Consensus Layer Withdrawal Vault</StatsPanelTitle>
        <ViewAllLink to="/vaults/withdrawal">View All</ViewAllLink>
      </StatsSectionHeader>
      <StatsPanel>
        <StatsGrid>
          <LidoStatsCard
            label="Current Balance"
            value={
              <LoadableContent loading={balanceLoading}>
                <Amount value={balance} decimals={decimals} symbol={symbol} />
              </LoadableContent>
            }
            icon={<AssetSquareIcon />}
            labelExtra={<WithdrawalVaultAddressLink />}
          />
          <LidoStatsCard
            label="Total withdrawal"
            value={
              <LoadableContent loading={loading}>
                {totalWithdrawalValue == null && !loading ? (
                  "--"
                ) : (
                  <Amount
                    value={totalWithdrawalValue}
                    decimals={decimals}
                    symbol={symbol}
                  />
                )}
              </LoadableContent>
            }
            icon={<TransferSquareIcon />}
          />
          <LidoStatsCard
            label="Total withdrawal count"
            icon={<TransferSquareIcon />}
            value={
              <LoadableContent loading={loading}>
                {totalWithdrawalCount == null && !loading
                  ? "--"
                  : formatCount(totalWithdrawalCount)}
              </LoadableContent>
            }
          />
        </StatsGrid>
      </StatsPanel>
    </StatsSection>
  );
}
