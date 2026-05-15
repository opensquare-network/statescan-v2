import styled from "styled-components";
import BreadCrumb from "../../components/breadCrumb";
import DetailTabs from "../../components/detail/tabs";
import DetailLayout from "../../components/layout/detailLayout";
import List from "../../components/list";
import EvmAddress from "../../components/lido/evmAddress";
import LidoStakingModuleETHDepositeds from "../../components/lido/stakingModule/ethDepositeds";
import LidoStakingModuleNodeOperators from "../../components/lido/stakingModule/nodeOperators";
import LidoRewardDistributionState from "../../components/lido/stakingModule/rewardDistributionState";
import LidoStakingModuleStEthBalance from "../../components/lido/stakingModule/stEthBalance";
import LidoStakingModuleStatus from "../../components/lido/stakingModule/status";
import LidoStakingModuleTimeline from "../../components/lido/stakingModule/timeline";
import {
  getShareLimit,
  isNorModule,
  toOptionalBlockNumber,
} from "../../components/lido/stakingModule/utils";
import { sortTimelineEvents } from "../../components/lido/stakingVault/utils";
import Loading from "../../components/loadings/loading";
import NoData from "../../components/noData";
import { Panel } from "../../components/styled/panel";
import { DetailedTime } from "../../components/styled/time";
import { useLidoStakingModuleData } from "../../hooks/lido/useLidoStakingModuleData";
import { formatLidoBp, toLidoTimestamp } from "../../utils/viewFuncs/lido";

const TabPanel = styled(Panel)`
  padding: 24px;
`;

function toStakingModuleDetailItems(module) {
  const latestTimeline = sortTimelineEvents(module.timelines).at(-1);

  return [
    { label: "Module ID", value: module.stakingModuleId },
    { label: "Module Name", value: module.name || "--" },
    {
      label: "Module Address",
      value: <EvmAddress address={module.moduleAddress} />,
    },
    isNorModule(module) && {
      label: "stETH Balance",
      value: (
        <LidoStakingModuleStEthBalance moduleAddress={module.moduleAddress} />
      ),
    },
    {
      label: "Status",
      value: <LidoStakingModuleStatus status={module.status} />,
    },
    isNorModule(module) && {
      label: "Reward Distribution State",
      value: (
        <LidoRewardDistributionState state={module.rewardDistributionState} />
      ),
    },
    {
      label: "Created By",
      value: <EvmAddress address={module.createdBy} />,
    },
    {
      label: "Updated Time",
      value: latestTimeline?.blockTime ? (
        <DetailedTime ts={toLidoTimestamp(latestTimeline.blockTime)} />
      ) : (
        "--"
      ),
    },
    { type: "divider" },
    {
      label: "Staking Module Fee",
      value: formatLidoBp(module.stakingModuleFee),
    },
    { label: "Treasury Fee", value: formatLidoBp(module.treasuryFee) },
    {
      label: "Stake Share Limit",
      value: formatLidoBp(getShareLimit(module)),
    },
    {
      label: "Priority Exit Share Threshold",
      value: formatLidoBp(module.priorityExitShareThreshold),
    },
    { type: "divider" },
    {
      label: "Max Deposits Per Block",
      value: toOptionalBlockNumber(module.maxDepositsPerBlock),
    },
    {
      label: "Min Deposit Block Distance",
      value: toOptionalBlockNumber(module.minDepositBlockDistance),
    },
  ].filter(Boolean);
}

export default function LidoStakingModule() {
  const { data, loading, stakingModuleId } = useLidoStakingModuleData();
  const breadCrumb = (
    <BreadCrumb
      data={[
        { name: "Staking Modules", path: "/staking-modules" },
        { name: `#${stakingModuleId}` },
      ]}
    />
  );

  if (loading) {
    return (
      <DetailLayout breadCrumb={breadCrumb}>
        <Panel>
          <Loading />
        </Panel>
      </DetailLayout>
    );
  }

  if (!data) {
    return (
      <DetailLayout breadCrumb={breadCrumb}>
        <Panel>
          <NoData />
        </Panel>
      </DetailLayout>
    );
  }

  const detailItems = toStakingModuleDetailItems(data);

  const tabs = [
    {
      name: "Timeline",
      value: "timeline",
      children: (
        <TabPanel>
          <LidoStakingModuleTimeline stakingModuleId={stakingModuleId} />
        </TabPanel>
      ),
    },
    {
      name: "Node Operators",
      value: "node-operators",
      children: (
        <LidoStakingModuleNodeOperators stakingModuleId={stakingModuleId} />
      ),
    },
    {
      name: "Deposits",
      value: "deposits",
      children: (
        <LidoStakingModuleETHDepositeds stakingModuleId={stakingModuleId} />
      ),
    },
  ];

  return (
    <DetailLayout breadCrumb={breadCrumb}>
      <Panel>
        <List data={detailItems} />
      </Panel>

      <DetailTabs tabs={tabs} />
    </DetailLayout>
  );
}
