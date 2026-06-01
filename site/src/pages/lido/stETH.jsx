import BreadCrumb from "../../components/breadCrumb";
import DetailLayout from "../../components/layout/detailLayout";
import DetailTabs from "../../components/detail/tabs";
import EvmAddress from "../../components/lido/evmAddress";
import List from "../../components/list";
import LoadableContent from "../../components/loadings/loadableContent";
import { Panel } from "../../components/styled/panel";
import { TextSecondary } from "../../components/styled/text";
import ValueDisplay from "../../components/displayValue";
import { LidoDepositsTable } from "./deposits";
import { LidoStETHHoldersTable } from "./holders";
import { LidoWithdrawalsTable } from "./withdrawals";
import { LIDO_STETH_ADDRESS } from "../../services/evm/lido";
import { useLidoOnchainStatsData } from "../../hooks/lido/useLidoOnchainStatsData";
import { useLidoProtocolStatData } from "../../hooks/lido/useLidoProtocolStatData";
import { formatCount } from "../../components/lido/home/metrics";
import { toLidoEtherAmount } from "../../utils/viewFuncs/lido";

const STETH_HOLDER_COUNT_STAT_ID = "stETHHolderCount";

function toValue(value, symbol) {
  return (
    <ValueDisplay
      value={toLidoEtherAmount(value ?? "0")}
      symbol={symbol}
      showNotEqualTooltip
    />
  );
}

function LidoStETHSummary() {
  const { data, loading } = useLidoOnchainStatsData();
  const { data: holders, loading: holdersLoading } = useLidoProtocolStatData(
    STETH_HOLDER_COUNT_STAT_ID,
  );
  const listData = [
    {
      label: "Total Supply",
      value: (
        <LoadableContent loading={loading}>
          <TextSecondary>
            {toValue(data.stEthTotalSupply, "stETH")}
          </TextSecondary>
        </LoadableContent>
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
        <LoadableContent loading={loading}>
          <TextSecondary>{toValue(data.bufferedEth, "ETH")}</TextSecondary>
        </LoadableContent>
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
  const tabs = [
    {
      name: "Deposits",
      value: "deposits",
      children: <LidoDepositsTable />,
    },
    {
      name: "Withdrawals",
      value: "withdrawals",
      children: <LidoWithdrawalsTable />,
    },
    {
      name: "Holders",
      value: "holders",
      children: <LidoStETHHoldersTable />,
    },
  ];

  return (
    <DetailLayout breadCrumb={breadCrumb}>
      <LidoStETHSummary />
      <DetailTabs tabs={tabs} />
    </DetailLayout>
  );
}
