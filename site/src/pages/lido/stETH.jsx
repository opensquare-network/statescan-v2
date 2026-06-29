import BreadCrumb from "../../components/breadCrumb";
import DetailLayout from "../../components/layout/detailLayout";
import DetailTabs from "../../components/detail/tabs";
import EvmAddress from "../../components/lido/evmAddress";
import LidoTokenAnalyticsChart from "../../components/lido/tokenAnalyticsChart";
import List from "../../components/list";
import LoadableContent from "../../components/loadings/loadableContent";
import { Panel } from "../../components/styled/panel";
import { TextSecondary } from "../../components/styled/text";
import { LidoDepositsTable } from "./deposits";
import { LidoStETHHoldersTable } from "./holders";
import { LidoWithdrawalsTable } from "./withdrawals";
import { LIDO_STETH_ADDRESS } from "../../services/evm/lido";
import { useLidoOnchainStatsData } from "../../hooks/lido/useLidoOnchainStatsData";
import { useLidoStEthHolderCountData } from "../../hooks/lido/useLidoProtocolStatData";
import { formatCount, OnchainAmount } from "../../components/lido/home/metrics";
import useChainSettings from "../../utils/hooks/chain/useChainSettings";
import { GET_LIDO_STETH_TOTALS } from "../../services/gql/lido";
import { useLidoServerQuery } from "../../hooks/lido/useLidoQuery";

function LidoStETHSummary() {
  const { decimals } = useChainSettings();
  const { data, loading } = useLidoOnchainStatsData();
  const { data: holders, loading: holdersLoading } =
    useLidoStEthHolderCountData();
  const listData = [
    {
      label: "Total Supply",
      value: (
        <TextSecondary>
          <OnchainAmount
            value={data.stEthTotalSupply}
            decimals={decimals}
            symbol="stETH"
            loading={loading}
          />
        </TextSecondary>
      ),
    },
    {
      label: "stETH Holders",
      value: (
        <LoadableContent loading={holdersLoading}>
          <TextSecondary>
            {holders?.count == null ? "--" : formatCount(holders.count)}
          </TextSecondary>
        </LoadableContent>
      ),
    },
    {
      label: "Buffered ETH",
      value: (
        <TextSecondary>
          <OnchainAmount
            value={data.bufferedEth}
            decimals={decimals}
            symbol="ETH"
            loading={loading}
          />
        </TextSecondary>
      ),
    },
    {
      label: "Contract Address",
      value: <EvmAddress address={LIDO_STETH_ADDRESS} />,
    },
  ];

  return (
    <Panel>
      <List data={listData} />
    </Panel>
  );
}

export default function LidoStETH() {
  const breadCrumb = <BreadCrumb data={[{ name: "stETH" }]} />;
  const { data: totals } = useLidoServerQuery(GET_LIDO_STETH_TOTALS);
  const tabs = [
    {
      name: "Deposits",
      value: "deposits",
      count: totals?.deposits?.total,
      children: <LidoDepositsTable />,
    },
    {
      name: "Withdrawals",
      value: "withdrawals",
      count: totals?.withdrawals?.total,
      children: <LidoWithdrawalsTable />,
    },
    {
      name: "Holders",
      value: "holders",
      count: totals?.stethHolders?.total,
      children: <LidoStETHHoldersTable />,
    },
    {
      name: "Analytics",
      value: "analytics",
      children: <LidoTokenAnalyticsChart token="stETH" />,
    },
  ];

  return (
    <DetailLayout breadCrumb={breadCrumb}>
      <LidoStETHSummary />
      <DetailTabs tabs={tabs} resetPage={false} />
    </DetailLayout>
  );
}
