import styled from "styled-components";
import BreadCrumb from "../../components/breadCrumb";
import DetailTabs from "../../components/detail/tabs";
import List from "../../components/list";
import LoadingIcon from "../../components/icons/loadingIcon";
import EvmAddress from "../../components/lido/evmAddress";
import LidoNodeOperatorTimeline from "../../components/lido/nodeOperator/timeline";
import Loading from "../../components/loadings/loading";
import NoData from "../../components/noData";
import Divider from "../../components/styled/divider";
import { Panel } from "../../components/styled/panel";
import { ColoredInterLink } from "../../components/styled/link";
import { DetailedTime } from "../../components/styled/time";
import { StatusNegativeTag, StatusPositiveTag } from "../../components/tag";
import DetailLayout from "../../components/layout/detailLayout";
import { useLidoNodeOperatorData } from "../../hooks/lido/useLidoNodeOperatorData";
import { useLidoNodeOperatorSummaryData } from "../../hooks/lido/useLidoNodeOperatorSummaryData";
import { useLidoStakingModuleData } from "../../hooks/lido/useLidoStakingModuleData";
import { toLidoBlockNumber, toLidoTimestamp } from "../../utils/viewFuncs/lido";

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

function toOptionalNumber(value) {
  return value == null ? "--" : toLidoBlockNumber(value);
}

function toOptionalTimestamp(value) {
  if (!Number(value)) {
    return "--";
  }

  return <DetailedTime ts={toLidoTimestamp(value)} />;
}

function toNodeOperatorDetailItems(nodeOperator, stakingModule) {
  const stakingModuleId = stakingModule?.id || nodeOperator.stakingModuleId;

  return [
    { label: "Node Operator ID", value: `#${nodeOperator.nodeOperatorId}` },
    { label: "Name", value: nodeOperator.name || "--" },
    {
      label: "Staking Module",
      value: (
        <ColoredInterLink to={`/staking-modules/${stakingModuleId}`}>
          #{stakingModuleId}
          {stakingModule?.name ? ` ${stakingModule.name}` : ""}
        </ColoredInterLink>
      ),
    },
    {
      label: "Reward Address",
      value: <EvmAddress address={nodeOperator.rewardAddress} />,
    },
    {
      label: "Vetted Signing Keys",
      value: toOptionalNumber(nodeOperator.vettedSigningKeysCount),
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
      value: toOptionalNumber(summary.targetLimitMode),
    },
    {
      label: "Target Validators Count",
      value: toOptionalNumber(summary.targetValidatorsCount),
    },
    {
      label: "Stuck Validators Count",
      value: toOptionalNumber(summary.stuckValidatorsCount),
    },
    {
      label: "Refunded Validators Count",
      value: toOptionalNumber(summary.refundedValidatorsCount),
    },
    {
      label: "Stuck Penalty End Time",
      value: toOptionalTimestamp(summary.stuckPenaltyEndTimestamp),
    },
    {
      label: "Total Exited Validators",
      value: toOptionalNumber(summary.totalExitedValidators),
    },
    {
      label: "Total Deposited Validators",
      value: toOptionalNumber(summary.totalDepositedValidators),
    },
    {
      label: "Depositable Validators Count",
      value: toOptionalNumber(summary.depositableValidatorsCount),
    },
  ];
}

export default function LidoNodeOperator() {
  const { data, loading, stakingModuleId, nodeOperatorId } =
    useLidoNodeOperatorData();
  const { data: stakingModule, loading: stakingModuleLoading } =
    useLidoStakingModuleData();
  const { data: summary, loading: summaryLoading } =
    useLidoNodeOperatorSummaryData(
      stakingModule?.moduleAddress,
      nodeOperatorId,
    );
  const isSummaryLoading = stakingModuleLoading || summaryLoading;
  const breadCrumb = (
    <BreadCrumb
      data={[
        { name: "Staking Modules", path: "/staking-modules" },
        {
          name: `#${stakingModuleId}`,
          path: `/staking-modules/${stakingModuleId}`,
        },
        {
          name: "Node Operators",
          path: `/staking-modules/${stakingModuleId}?tab=node-operators&page=1`,
        },
        { name: `#${nodeOperatorId}` },
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
  ];

  return (
    <DetailLayout breadCrumb={breadCrumb}>
      <Panel>
        <List data={toNodeOperatorDetailItems(data, stakingModule)} />
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

      <DetailTabs tabs={tabs} />
    </DetailLayout>
  );
}
