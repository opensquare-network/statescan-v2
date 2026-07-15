import isNil from "lodash.isnil";
import styled from "styled-components";
import Timeline from "../../timeline";
import TimelineItemFields from "../../timeline/itemFields";
import TimelineItemIcon from "../../timeline/itemIcon";
import { toAddressRow, toBpRow, toIntegerRow } from "../timelineRows";
import { toLidoTimestamp } from "../../../utils/viewFuncs/lido";

const StakingModuleTimelineItemFields = styled(TimelineItemFields)`
  > div > div:first-child {
    min-width: 280px;
  }

  > div > div:last-child {
    padding-left: 40px;
  }

  @media screen and (max-width: 900px) {
    > div > div:first-child {
      min-width: 0;
    }

    > div > div:last-child {
      padding-left: 0;
    }
  }
`;

function toAddedRows(payload) {
  return [
    payload?.stakingModuleId && ["Module ID", payload.stakingModuleId],
    payload?.name && ["Name", payload.name],
    toAddressRow("Module Address", payload?.stakingModule),
    toAddressRow("Created By", payload?.createdBy),
  ].filter(Boolean);
}

function toFeesSetRows(payload) {
  return [
    toAddressRow("Set By", payload?.setBy),
    toBpRow("Staking Module Fee", payload?.stakingModuleFee),
    toBpRow("Treasury Fee", payload?.treasuryFee),
  ].filter(Boolean);
}

function toMaxDepositsPerBlockRows(payload) {
  return [
    toAddressRow("Set By", payload?.setBy),
    toIntegerRow("Max Deposits Per Block", payload?.maxDepositsPerBlock),
  ].filter(Boolean);
}

function toMinDepositBlockDistanceRows(payload) {
  return [
    toAddressRow("Set By", payload?.setBy),
    toIntegerRow(
      "Min Deposit Block Distance",
      payload?.minDepositBlockDistance,
    ),
  ].filter(Boolean);
}

function toShareLimitRows(payload) {
  return [
    toAddressRow("Set By", payload?.setBy),
    toBpRow("Stake Share Limit", payload?.stakeShareLimit),
    toBpRow(
      "Priority Exit Share Threshold",
      payload?.priorityExitShareThreshold,
    ),
  ].filter(Boolean);
}

function toTargetShareRows(payload) {
  return [
    toAddressRow("Set By", payload?.setBy),
    toBpRow("Target Share", payload?.targetShare),
  ].filter(Boolean);
}

function toStatusSetRows(payload) {
  return [
    toAddressRow("Set By", payload?.setBy),
    !isNil(payload?.status) && ["Status", payload.status],
  ].filter(Boolean);
}

function toEventRows(event) {
  if (event.eventName === "StakingModuleAdded") {
    return toAddedRows(event);
  }

  if (event.eventName === "StakingModuleFeesSet") {
    return toFeesSetRows(event);
  }

  if (event.eventName === "StakingModuleMaxDepositsPerBlockSet") {
    return toMaxDepositsPerBlockRows(event);
  }

  if (event.eventName === "StakingModuleMinDepositBlockDistanceSet") {
    return toMinDepositBlockDistanceRows(event);
  }

  if (event.eventName === "StakingModuleShareLimitSet") {
    return toShareLimitRows(event);
  }

  if (event.eventName === "StakingModuleTargetShareSet") {
    return toTargetShareRows(event);
  }

  if (event.eventName === "StakingModuleStatusSet") {
    return toStatusSetRows(event);
  }

  return [];
}

function toTimelineItem(event) {
  return {
    name: event.eventName,
    event,
    rows: toEventRows(event),
    indexer: {
      blockTime: toLidoTimestamp(event.indexer?.blockTimestamp),
      blockHeight: event.indexer?.blockNumber,
      txHash: event.indexer?.txHash,
    },
  };
}

export default function LidoStakingModuleTimeline({ events = [], loading }) {
  const timeline = events.map((event) => toTimelineItem(event));

  return (
    <Timeline
      timeline={timeline}
      loading={loading}
      IconComponent={TimelineItemIcon}
      FieldsComponent={StakingModuleTimelineItemFields}
    />
  );
}
