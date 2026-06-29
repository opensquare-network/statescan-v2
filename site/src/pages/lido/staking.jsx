import BigNumber from "bignumber.js";
import BreadCrumb from "../../components/breadCrumb";
import DetailLayout from "../../components/layout/detailLayout";
import DetailTabs from "../../components/detail/tabs";
import EvmAddress from "../../components/lido/evmAddress";
import LidoStakingRouterETHDepositedsTable from "../../components/lido/stakingRouterETHDepositeds/table";
import LidoStakingVaultsTable from "../../components/lido/stakingVault/table";
import List from "../../components/list";
import LoadableContent from "../../components/loadings/loadableContent";
import Advanced from "../../components/advanced";
import { Panel } from "../../components/styled/panel";
import { TextSecondary } from "../../components/styled/text";
import { LidoStakingModulesTable } from "./stakingModules";
import { formatCount } from "../../components/lido/home/metrics";
import { useLidoStakingOverviewData } from "../../hooks/lido/useLidoStakingOverviewData";
import { useLidoStakingModulesData } from "../../hooks/lido/useLidoStakingModulesData";
import { useLidoStakingRouterETHDepositedsData } from "../../hooks/lido/useLidoStakingRouterETHDepositedsData";
import { useLidoVaultsData } from "../../hooks/lido/useLidoVaultsData";
import { GET_LIDO_STAKING_TOTALS } from "../../services/gql/lido";
import { useLidoServerQuery } from "../../hooks/lido/useLidoQuery";

function formatFee(value, precisionPoints) {
  if (value == null || precisionPoints == null) {
    return "--";
  }

  return `${new BigNumber(value)
    .multipliedBy(100)
    .div(precisionPoints)
    .decimalPlaces(2)
    .toString()}%`;
}

function MetricValue({ loading, children }) {
  return (
    <LoadableContent loading={loading}>
      <TextSecondary>{children}</TextSecondary>
    </LoadableContent>
  );
}

function LidoStakingSummary() {
  const { data, loading } = useLidoStakingOverviewData();
  const listData = [
    {
      label: "Active Modules",
      value: (
        <MetricValue loading={loading}>
          {data.totalModules == null ? "--" : formatCount(data.totalModules)}
        </MetricValue>
      ),
    },
    {
      label: "Active Validators",
      value: (
        <MetricValue loading={loading}>
          {data.activeValidators == null
            ? "--"
            : formatCount(data.activeValidators)}
        </MetricValue>
      ),
    },
    {
      label: "Total Fee",
      value: (
        <MetricValue loading={loading}>
          {formatFee(data.totalFee, data.precisionPoints)}
        </MetricValue>
      ),
    },
    {
      label: "Node Operator Fee",
      value: (
        <MetricValue loading={loading}>
          {formatFee(data.nodeOperatorFee, data.precisionPoints)}
        </MetricValue>
      ),
    },
    {
      label: "Treasury Fee",
      value: (
        <MetricValue loading={loading}>
          {formatFee(data.treasuryFee, data.precisionPoints)}
        </MetricValue>
      ),
    },
  ];
  const advancedListData = [
    {
      label: "Router Address",
      value: (
        <MetricValue loading={loading}>
          <EvmAddress address={data.contractAddress} />
        </MetricValue>
      ),
    },
    {
      label: "Router Version",
      value: (
        <MetricValue loading={loading}>
          {data.routerVersion ?? "--"}
        </MetricValue>
      ),
    },
  ];

  return (
    <Panel>
      <List data={listData} />
      <Advanced>
        <List data={advancedListData} compact />
      </Advanced>
    </Panel>
  );
}

function LidoStakingModulesTab() {
  const { data, loading } = useLidoStakingModulesData();

  return <LidoStakingModulesTable data={data} loading={loading} />;
}

function LidoModuleDepositsTab() {
  const { data, loading } = useLidoStakingRouterETHDepositedsData();

  return <LidoStakingRouterETHDepositedsTable data={data} loading={loading} />;
}

function LidoStakingVaultsTab() {
  const { data, loading } = useLidoVaultsData();

  return <LidoStakingVaultsTable data={data} loading={loading} />;
}

export default function LidoStaking() {
  const breadCrumb = <BreadCrumb data={[{ name: "Staking" }]} />;
  const { data: totals } = useLidoServerQuery(GET_LIDO_STAKING_TOTALS);
  const tabs = [
    {
      name: "Modules",
      value: "modules",
      count: totals?.stakingModules?.total,
      children: <LidoStakingModulesTab />,
    },
    {
      name: "Module Deposits",
      value: "module-deposits",
      children: <LidoModuleDepositsTab />,
    },
    {
      name: "Vaults",
      value: "vaults",
      count: totals?.vaultHubVaults?.total,
      children: <LidoStakingVaultsTab />,
    },
  ];

  return (
    <DetailLayout breadCrumb={breadCrumb}>
      <LidoStakingSummary />
      <DetailTabs tabs={tabs} resetPage={false} />
    </DetailLayout>
  );
}
