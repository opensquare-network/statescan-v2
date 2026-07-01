import { useState } from "react";
import styled from "styled-components";
import LidoOverview from "../../components/lido/home/overview";
import LidoLatestUserActions from "../../components/lido/home/latestUserActions";
import LidoRewardsVaultStats from "../../components/lido/home/rewardsVault";
import LidoSearch from "../../components/lido/home/search";
import LidoUserStaking, {
  PERIODS,
} from "../../components/lido/home/userStaking";
import LidoWithdrawalVaultStats from "../../components/lido/home/withdrawalVault";
import HomeLayout from "../../components/layout/home";
import {
  LIDO_REWARDS_VAULT_ADDRESS,
  LIDO_WITHDRAWAL_VAULT_ADDRESS,
} from "../../services/evm/lido";
import { useLidoDailyStatsData } from "../../hooks/lido/useLidoDailyStatsData";
import { useLidoOnchainStatsData } from "../../hooks/lido/useLidoOnchainStatsData";
import { useLidoEvmBalanceData } from "../../hooks/lido/useLidoEvmBalanceData";
import { useLidoLastDailyStatsData } from "../../hooks/lido/useLidoProtocolStatData";
import useChainSettings from "../../utils/hooks/chain/useChainSettings";

const WITHDRAWAL_VAULT_RECEIVED_STAT_ID = "withdrawalVaultETHReceived";
const REWARDS_VAULT_RECEIVED_STAT_ID = "rewardsVaultETHReceived";

const SearchSection = styled.div`
  margin-bottom: 40px;
`;

const Section = styled.div`
  & + & {
    margin-top: 24px;
  }
`;

export default function LidoHome() {
  const [period, setPeriod] = useState(PERIODS[0].value);
  const chainSettings = useChainSettings();
  const { decimals, symbol } = chainSettings;
  const { data, loading } = useLidoDailyStatsData();
  const { data: vaultStats, loading: vaultStatsLoading } =
    useLidoLastDailyStatsData();
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
    <HomeLayout>
      <SearchSection>
        <LidoSearch />
      </SearchSection>

      <Section>
        <LidoOverview
          data={onchainData}
          decimals={decimals}
          symbol={symbol}
          loading={onchainLoading}
        />
      </Section>

      <Section>
        <LidoLatestUserActions decimals={decimals} symbol={symbol} />
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
          stats={vaultStats[WITHDRAWAL_VAULT_RECEIVED_STAT_ID]}
          loading={vaultStatsLoading}
          balance={withdrawalVaultBalance}
          balanceLoading={withdrawalVaultBalanceLoading}
          decimals={decimals}
          symbol={symbol}
        />
      </Section>

      <Section>
        <LidoRewardsVaultStats
          stats={vaultStats[REWARDS_VAULT_RECEIVED_STAT_ID]}
          loading={vaultStatsLoading}
          balance={rewardsVaultBalance}
          balanceLoading={rewardsVaultBalanceLoading}
          decimals={decimals}
          symbol={symbol}
        />
      </Section>
    </HomeLayout>
  );
}
