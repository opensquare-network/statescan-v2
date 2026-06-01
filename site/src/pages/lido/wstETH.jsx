import BreadCrumb from "../../components/breadCrumb";
import DetailLayout from "../../components/layout/detailLayout";
import DetailTabs from "../../components/detail/tabs";
import EvmAddress from "../../components/lido/evmAddress";
import List from "../../components/list";
import LoadableContent from "../../components/loadings/loadableContent";
import { Panel } from "../../components/styled/panel";
import { TextSecondary } from "../../components/styled/text";
import ValueDisplay from "../../components/displayValue";
import { LidoWstETHHoldersTable } from "./holders";
import { LidoWstETHUnwrapsTable, LidoWstETHWrapsTable } from "./wstETHWraps";
import { LIDO_WSTETH_ADDRESS } from "../../services/evm/lido";
import { useLidoOnchainStatsData } from "../../hooks/lido/useLidoOnchainStatsData";
import { useLidoProtocolStatData } from "../../hooks/lido/useLidoProtocolStatData";
import { formatCount } from "../../components/lido/home/metrics";
import { toLidoEtherAmount } from "../../utils/viewFuncs/lido";

const WSTETH_HOLDER_COUNT_STAT_ID = "wstETHHolderCount";

function toValue(value, symbol) {
  return (
    <ValueDisplay
      value={toLidoEtherAmount(value ?? "0")}
      symbol={symbol}
      showNotEqualTooltip
    />
  );
}

function LidoWstETHSummary() {
  const { data, loading } = useLidoOnchainStatsData();
  const { data: holders, loading: holdersLoading } = useLidoProtocolStatData(
    WSTETH_HOLDER_COUNT_STAT_ID,
  );
  const listData = [
    {
      label: "Total Supply",
      value: (
        <LoadableContent loading={loading}>
          <TextSecondary>
            {toValue(data.wstEthTotalSupply, "wstETH")}
          </TextSecondary>
        </LoadableContent>
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
        <LoadableContent loading={loading}>
          <TextSecondary>{toValue(data.stEthPerToken, "stETH")}</TextSecondary>
        </LoadableContent>
      ),
    },
    {
      label: "wstETH / stETH",
      value: (
        <LoadableContent loading={loading}>
          <TextSecondary>
            {toValue(data.tokensPerStEth, "wstETH")}
          </TextSecondary>
        </LoadableContent>
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
  const tabs = [
    {
      name: "Wrap",
      value: "wrap",
      children: <LidoWstETHWrapsTable />,
    },
    {
      name: "Unwrap",
      value: "unwrap",
      children: <LidoWstETHUnwrapsTable />,
    },
    {
      name: "Holders",
      value: "holders",
      children: <LidoWstETHHoldersTable />,
    },
  ];

  return (
    <DetailLayout breadCrumb={breadCrumb}>
      <LidoWstETHSummary />
      <DetailTabs tabs={tabs} />
    </DetailLayout>
  );
}
