import { useState } from "react";
import styled from "styled-components";
import LidoOverview from "../../components/lido/home/overview";
import LidoRewardsVaultStats from "../../components/lido/home/rewardsVault";
import LidoUserStaking, {
  PERIODS,
} from "../../components/lido/home/userStaking";
import LidoWithdrawalVaultStats from "../../components/lido/home/withdrawalVault";
import Layout from "../../components/layout";
import {
  LIDO_REWARDS_VAULT_ADDRESS,
  LIDO_WITHDRAWAL_VAULT_ADDRESS,
} from "../../services/evm/lido";
import { useLidoDailyStatsData } from "../../hooks/lido/useLidoDailyStatsData";
import { useLidoOnchainStatsData } from "../../hooks/lido/useLidoOnchainStatsData";
import { useLidoRewardsVaultStatsData } from "../../hooks/lido/useLidoRewardsVaultStatsData";
import { useLidoEvmBalanceData } from "../../hooks/lido/useLidoEvmBalanceData";
import { useLidoWithdrawalVaultStatsData } from "../../hooks/lido/useLidoWithdrawalVaultStatsData";
import useChainSettings from "../../utils/hooks/chain/useChainSettings";
import { Inter_24_700 } from "../../styles/text";

const PageTitle = styled.h1`
  all: unset;
  margin-bottom: 24px;
  display: block;
  ${Inter_24_700};
  color: ${(props) => props.theme.fontPrimary};
`;

const Section = styled.div`
  margin-top: 80px;
  & + & {
    margin-top: 24px;
  }
`;

export default function LidoHome() {
  const [period, setPeriod] = useState(PERIODS[0].value);
  const chainSettings = useChainSettings();
  const { decimals, symbol } = chainSettings;
  const { data, loading } = useLidoDailyStatsData();
  const { data: withdrawalVaultData, loading: withdrawalVaultLoading } =
    useLidoWithdrawalVaultStatsData();
  const { data: rewardsVaultData, loading: rewardsVaultLoading } =
    useLidoRewardsVaultStatsData();
  const {
    data: withdrawalVaultBalance,
    loading: withdrawalVaultBalanceLoading,
  } = useLidoEvmBalanceData(LIDO_WITHDRAWAL_VAULT_ADDRESS);
  const { data: rewardsVaultBalance, loading: rewardsVaultBalanceLoading } =
    useLidoEvmBalanceData(LIDO_REWARDS_VAULT_ADDRESS);
  const { data: onchainData, loading: onchainLoading } =
    useLidoOnchainStatsData();
  const stats = data[period];

  return (
    <Layout>
      <PageTitle>Lido Explorer</PageTitle>

      <Section>
        <LidoOverview
          data={onchainData}
          decimals={decimals}
          symbol={symbol}
          loading={onchainLoading}
        />
      </Section>

      <Section>
        <LidoUserStaking
          period={period}
          onPeriodChange={setPeriod}
          stats={stats}
          loading={loading}
          decimals={decimals}
          symbol={symbol}
        />
      </Section>

      <Section>
        <LidoWithdrawalVaultStats
          stats={withdrawalVaultData}
          loading={withdrawalVaultLoading}
          balance={withdrawalVaultBalance}
          balanceLoading={withdrawalVaultBalanceLoading}
          decimals={decimals}
          symbol={symbol}
        />
      </Section>

      <Section>
        <LidoRewardsVaultStats
          stats={rewardsVaultData}
          loading={rewardsVaultLoading}
          balance={rewardsVaultBalance}
          balanceLoading={rewardsVaultBalanceLoading}
          decimals={decimals}
          symbol={symbol}
        />
      </Section>
    </Layout>
  );
}
