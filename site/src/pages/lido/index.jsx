import { useState } from "react";
import styled from "styled-components";
import LidoOverview from "../../components/lido/home/overview";
import LidoStakingActivity, {
  PERIODS,
} from "../../components/lido/home/staking";
import Layout from "../../components/layout";
import { useLidoDailyStatsData } from "../../hooks/lido/useLidoDailyStatsData";
import { useLidoOnchainStatsData } from "../../hooks/lido/useLidoOnchainStatsData";
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
  const { data } = useLidoDailyStatsData();
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
        <LidoStakingActivity
          period={period}
          onPeriodChange={setPeriod}
          stats={stats}
          decimals={decimals}
          symbol={symbol}
        />
      </Section>
    </Layout>
  );
}
