import isNil from "lodash.isnil";
import styled from "styled-components";
import BreadCrumb from "../../components/breadCrumb";
import DetailTabs from "../../components/detail/tabs";
import ValueDisplay from "../../components/displayValue";
import List from "../../components/list";
import LoadingIcon from "../../components/icons/loadingIcon";
import EvmAddress from "../../components/lido/evmAddress";
import LidoCsmExtendedManagerPermissions from "../../components/lido/nodeOperator/extendedManagerPermissions";
import LidoNodeOperatorRewards from "../../components/lido/nodeOperator/rewards";
import LidoNodeOperatorRewardsDistributed from "../../components/lido/nodeOperator/rewardsDistributed";
import LidoNodeOperatorTimeline from "../../components/lido/nodeOperator/timeline";
import Loading from "../../components/loadings/loading";
import NoData from "../../components/noData";
import Divider from "../../components/styled/divider";
import { Panel } from "../../components/styled/panel";
import { ColoredInterLink } from "../../components/styled/link";
import { DetailedTime } from "../../components/styled/time";
import { StatusNegativeTag, StatusPositiveTag } from "../../components/tag";
import HelpLabel from "../../components/tooltip/helpLabel";
import DetailLayout from "../../components/layout/detailLayout";
import {
  isCsmModule,
  isNorModule,
} from "../../components/lido/stakingModule/utils";
import { useLidoNodeOperatorData } from "../../hooks/lido/useLidoNodeOperatorData";
import { useLidoNodeOperatorSummaryData } from "../../hooks/lido/useLidoNodeOperatorSummaryData";
import { useLidoStakingModuleData } from "../../hooks/lido/useLidoStakingModuleData";
import {
  toLidoAmount,
  toLidoBlockNumber,
  toLidoTimestamp,
} from "../../utils/viewFuncs/lido";

const TabPanel = styled(Panel)`
  padding: 24px;
`;

const SummarySection = styled.div`
  position: relative;
  overflow: hidden;
`;

const SummaryLoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.fillPanelBlanket};
`;

function renderStatus(active) {
  const TagComponent = active ? StatusPositiveTag : StatusNegativeTag;

  return <TagComponent>{active ? "Active" : "Inactive"}</TagComponent>;
}

function toCsmNodeOperatorDetailItems(nodeOperator, stakingModule) {
  const stakingModuleId = stakingModule?.stakingModuleId;
  const stakingModuleAddress = stakingModule?.stakingModule;

  return [
    { label: "Node Operator ID", value: `#${nodeOperator.nodeOperatorId}` },
    {
      label: "Staking Module",
      value: (
        <ColoredInterLink to={`/staking/modules/${stakingModuleId}`}>
          {stakingModule?.name}
        </ColoredInterLink>
      ),
    },
    {
      label: "Manager Address",
      value: <EvmAddress address={nodeOperator.managerAddress} />,
    },
    {
      label: "Reward Address",
      value: <EvmAddress address={nodeOperator.rewardAddress} />,
    },
    {
      label: "Extended Manager Permissions",
      value: (
        <LidoCsmExtendedManagerPermissions
          value={nodeOperator.extendedManagerPermissions}
          moduleAddress={stakingModuleAddress}
          nodeOperatorId={nodeOperator.nodeOperatorId}
        />
      ),
    },
    {
      label: "Vetted Signing Keys",
      value: isNil(
        nodeOperator.vettedSigningKeysCount ??
          nodeOperator.approvedValidatorsCount,
      )
        ? "--"
        : toLidoBlockNumber(
            nodeOperator.vettedSigningKeysCount ??
              nodeOperator.approvedValidatorsCount,
          ),
    },
  ];
}

function toNorNodeOperatorDetailItems(nodeOperator, stakingModule) {
  const stakingModuleId = stakingModule?.stakingModuleId;

  return [
    { label: "Node Operator ID", value: `#${nodeOperator.nodeOperatorId}` },
    { label: "Name", value: nodeOperator.name },
    {
      label: "Staking Module",
      value: (
        <ColoredInterLink to={`/staking/modules/${stakingModuleId}`}>
          {stakingModule?.name}
        </ColoredInterLink>
      ),
    },
    {
      label: "Reward Address",
      value: <EvmAddress address={nodeOperator.rewardAddress} />,
    },
    {
      label: "Vetted Signing Keys",
      value: isNil(
        nodeOperator.vettedSigningKeysCount ??
          nodeOperator.approvedValidatorsCount,
      )
        ? "--"
        : toLidoBlockNumber(
            nodeOperator.vettedSigningKeysCount ??
              nodeOperator.approvedValidatorsCount,
          ),
    },
    {
      label: (
        <HelpLabel tip="Total rewards in shares.">Total Rewards</HelpLabel>
      ),
      value: isNil(nodeOperator.rewardsDistributedShares) ? (
        "--"
      ) : (
        <ValueDisplay
          value={toLidoAmount(nodeOperator.rewardsDistributedShares, 18)}
          symbol=""
          showNotEqualTooltip
        />
      ),
    },
    {
      label: "Status",
      value: renderStatus(nodeOperator.active),
    },
  ];
}

function toNodeOperatorSummaryItems(summary) {
  return [
    {
      label: "Target Limit Mode",
      value: isNil(summary.targetLimitMode)
        ? "--"
        : toLidoBlockNumber(summary.targetLimitMode),
    },
    {
      label: "Target Validators Count",
      value: isNil(summary.targetValidatorsCount)
        ? "--"
        : toLidoBlockNumber(summary.targetValidatorsCount),
    },
    {
      label: "Stuck Validators Count",
      value: isNil(summary.stuckValidatorsCount)
        ? "--"
        : toLidoBlockNumber(summary.stuckValidatorsCount),
    },
    {
      label: "Refunded Validators Count",
      value: isNil(summary.refundedValidatorsCount)
        ? "--"
        : toLidoBlockNumber(summary.refundedValidatorsCount),
    },
    {
      label: "Stuck Penalty End Time",
      value: Number(summary.stuckPenaltyEndTimestamp) ? (
        <DetailedTime ts={toLidoTimestamp(summary.stuckPenaltyEndTimestamp)} />
      ) : (
        "--"
      ),
    },
    {
      label: "Total Exited Validators",
      value: isNil(summary.totalExitedValidators)
        ? "--"
        : toLidoBlockNumber(summary.totalExitedValidators),
    },
    {
      label: "Total Deposited Validators",
      value: isNil(summary.totalDepositedValidators)
        ? "--"
        : toLidoBlockNumber(summary.totalDepositedValidators),
    },
    {
      label: "Depositable Validators Count",
      value: isNil(summary.depositableValidatorsCount)
        ? "--"
        : toLidoBlockNumber(summary.depositableValidatorsCount),
    },
  ];
}

export default function LidoNodeOperator() {
  const { data, loading, stakingModuleId, nodeOperatorId } =
    useLidoNodeOperatorData();
  const { data: stakingModule, loading: stakingModuleLoading } =
    useLidoStakingModuleData();
  const isNor = isNorModule(stakingModule);
  const isCsm = isCsmModule(stakingModule);
  const { data: summary, loading: summaryLoading } =
    useLidoNodeOperatorSummaryData(
      stakingModule?.moduleAddress,
      nodeOperatorId,
    );
  const isSummaryLoading = stakingModuleLoading || summaryLoading;
  const breadCrumb = (
    <BreadCrumb
      data={[
        { name: "Staking Modules", path: "/staking/modules" },
        {
          name: `#${stakingModuleId}`,
          path: `/staking/modules/${stakingModuleId}`,
        },
        {
          name: "Node Operators",
          path: `/staking/modules/${stakingModuleId}?tab=node-operators&page=1`,
        },
        { name: `#${nodeOperatorId}` },
      ]}
    />
  );

  if (loading || stakingModuleLoading) {
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

  const detailItems = isCsm
    ? toCsmNodeOperatorDetailItems(data, stakingModule)
    : toNorNodeOperatorDetailItems(data, stakingModule);
  const tabs = [
    {
      name: "Timeline",
      value: "timeline",
      children: (
        <TabPanel>
          <LidoNodeOperatorTimeline data={data.timelines} loading={loading} />
        </TabPanel>
      ),
    },
    isNor && {
      name: "Rewards",
      value: "rewards",
      children: (
        <LidoNodeOperatorRewardsDistributed
          stakingModuleId={stakingModuleId}
          nodeOperatorId={nodeOperatorId}
        />
      ),
    },
    isCsm && {
      name: "Rewards",
      value: "rewards",
      children: <LidoNodeOperatorRewards nodeOperatorId={nodeOperatorId} />,
    },
  ].filter(Boolean);

  return (
    <DetailLayout breadCrumb={breadCrumb}>
      <Panel>
        <List data={detailItems} />
        <Divider />
        <SummarySection>
          <List data={toNodeOperatorSummaryItems(summary)} />
          {isSummaryLoading && (
            <SummaryLoadingOverlay>
              <LoadingIcon />
            </SummaryLoadingOverlay>
          )}
        </SummarySection>
      </Panel>

      <DetailTabs tabs={tabs} resetPage={false} />
    </DetailLayout>
  );
}
