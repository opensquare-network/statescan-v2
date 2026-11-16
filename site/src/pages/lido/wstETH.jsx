import BreadCrumb from "../../components/breadCrumb";
import DetailLayout from "../../components/layout/detailLayout";
import DetailTabs from "../../components/detail/tabs";
import EvmAddress from "../../components/lido/evmAddress";
import LidoTokenAnalyticsChart from "../../components/lido/tokenAnalyticsChart";
import List from "../../components/list";
import LoadableContent from "../../components/loadings/loadableContent";
import { Panel } from "../../components/styled/panel";
import { TextSecondary } from "../../components/styled/text";
import { LidoWstETHHoldersTable } from "./holders";
import { LidoWstETHUnwrapsTable, LidoWstETHWrapsTable } from "./wstETHWraps";
import { LIDO_WSTETH_ADDRESS } from "../../services/evm/lido";
import { useLidoOnchainStatsData } from "../../hooks/lido/useLidoOnchainStatsData";
import { useLidoWstEthHolderCountData } from "../../hooks/lido/useLidoProtocolStatData";
import {
  formatCount,
  OnchainAmount,
  RateValue,
} from "../../components/lido/home/metrics";
import useChainSettings from "../../utils/hooks/chain/useChainSettings";
import { GET_LIDO_SERVER_WSTETH_TOTALS } from "../../services/gql/lido";
import { useLidoServerQuery } from "../../hooks/lido/useLidoQuery";

function LidoWstETHSummary() {
  const { decimals } = useChainSettings();
  const { data, loading } = useLidoOnchainStatsData();
  const { data: holders, loading: holdersLoading } =
    useLidoWstEthHolderCountData();
  const listData = [
    {
      label: "Total Supply",
      value: (
        <TextSecondary>
          <OnchainAmount
            value={data.wstEthTotalSupply}
            decimals={decimals}
            symbol="wstETH"
            loading={loading}
          />
        </TextSecondary>
      ),
    },
    {
      label: "wstETH Holders",
      value: (
        <LoadableContent loading={holdersLoading}>
          <TextSecondary>
            {holders?.count == null ? "--" : formatCount(holders.count)}
          </TextSecondary>
        </LoadableContent>
      ),
    },
    {
      label: "stETH / wstETH",
      value: (
        <TextSecondary>
          <RateValue
            value={data.stEthPerToken}
            decimals={decimals}
            loading={loading}
          />
        </TextSecondary>
      ),
    },
    {
      label: "wstETH / stETH",
      value: (
        <TextSecondary>
          <RateValue
            value={data.tokensPerStEth}
            decimals={decimals}
            loading={loading}
          />
        </TextSecondary>
      ),
    },
    {
      label: "Contract Address",
      value: <EvmAddress address={LIDO_WSTETH_ADDRESS} />,
    },
  ];

  return (
    <Panel>
      <List data={listData} />
    </Panel>
  );
}

export default function LidoWstETH() {
  const breadCrumb = <BreadCrumb data={[{ name: "wstETH" }]} />;
  const { data: totals } = useLidoServerQuery(GET_LIDO_SERVER_WSTETH_TOTALS);
  const tabs = [
    {
      name: "Wrap",
      value: "wrap",
      count: totals?.wrap?.total,
      children: <LidoWstETHWrapsTable />,
    },
    {
      name: "Unwrap",
      value: "unwrap",
      count: totals?.unwrap?.total,
      children: <LidoWstETHUnwrapsTable />,
    },
    {
      name: "Holders",
      value: "holders",
      count: totals?.wstethHolders?.total,
      children: <LidoWstETHHoldersTable />,
    },
    {
      name: "Analytics",
      value: "analytics",
      children: <LidoTokenAnalyticsChart token="wstETH" />,
    },
  ];

  return (
    <DetailLayout breadCrumb={breadCrumb}>
      <LidoWstETHSummary />
      <DetailTabs tabs={tabs} resetPage={false} />
    </DetailLayout>
  );
}
