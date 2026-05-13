import isNil from "lodash.isnil";
import styled from "styled-components";
import Timeline from "../../timeline";
import TimelineItemFields from "../../timeline/itemFields";
import TimelineItemIcon from "../../timeline/itemIcon";
import { toAddressRow, toBpRow, toIntegerRow } from "../timelineRows";
import { useLidoStakingModuleTimelineData } from "../../../hooks/lido/useLidoStakingModuleTimelineData";
import { toLidoTimestamp } from "../../../utils/viewFuncs/lido";
import { sortTimelineEvents } from "../stakingVault/utils";

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

function toAddedRows(event) {
  const payload = event.stakingModuleAdded;

  return [
    payload?.stakingModuleId && ["Module ID", payload.stakingModuleId],
    payload?.name && ["Name", payload.name],
    toAddressRow("Module Address", payload?.stakingModule),
    toAddressRow("Created By", payload?.createdBy),
  ].filter(Boolean);
}

function toFeesSetRows(event) {
  const payload = event.stakingModuleFeesSet;

  return [
    toAddressRow("Set By", payload?.setBy),
    toBpRow("Staking Module Fee", payload?.stakingModuleFee),
    toBpRow("Treasury Fee", payload?.treasuryFee),
  ].filter(Boolean);
}

function toMaxDepositsPerBlockRows(event) {
  const payload = event.stakingModuleMaxDepositsPerBlockSet;

  return [
    toAddressRow("Set By", payload?.setBy),
    toIntegerRow("Max Deposits Per Block", payload?.maxDepositsPerBlock),
  ].filter(Boolean);
}

function toMinDepositBlockDistanceRows(event) {
  const payload = event.stakingModuleMinDepositBlockDistanceSet;

  return [
    toAddressRow("Set By", payload?.setBy),
    toIntegerRow(
      "Min Deposit Block Distance",
      payload?.minDepositBlockDistance,
    ),
  ].filter(Boolean);
}

function toShareLimitRows(event) {
  const payload = event.stakingModuleShareLimitSet;

  return [
    toAddressRow("Set By", payload?.setBy),
    toBpRow("Stake Share Limit", payload?.stakeShareLimit),
    toBpRow(
      "Priority Exit Share Threshold",
      payload?.priorityExitShareThreshold,
    ),
  ].filter(Boolean);
}

function toTargetShareRows(event) {
  const payload = event.stakingModuleTargetShareSet;

  return [
    toAddressRow("Set By", payload?.setBy),
    toBpRow("Target Share", payload?.targetShare),
  ].filter(Boolean);
}

function toStatusSetRows(event) {
  const payload = event.stakingModuleStatusSet;

  return [
    toAddressRow("Set By", payload?.setBy),
    !isNil(payload?.status) && ["Status", payload.status],
  ].filter(Boolean);
}

function toEventRows(event) {
  if (event.stakingModuleAdded) {
    return toAddedRows(event);
  } else if (event.stakingModuleFeesSet) {
    return toFeesSetRows(event);
  } else if (event.stakingModuleMaxDepositsPerBlockSet) {
    return toMaxDepositsPerBlockRows(event);
  } else if (event.stakingModuleMinDepositBlockDistanceSet) {
    return toMinDepositBlockDistanceRows(event);
  } else if (event.stakingModuleShareLimitSet) {
    return toShareLimitRows(event);
  } else if (event.stakingModuleTargetShareSet) {
    return toTargetShareRows(event);
  } else if (event.stakingModuleStatusSet) {
    return toStatusSetRows(event);
  }

  return [];
}

function toTimelineItem(event) {
  return {
    name: event.eventType || "--",
    event,
    rows: toEventRows(event),
    indexer: {
      blockTime: toLidoTimestamp(event.blockTime),
      blockHeight: event.blockNumber,
      txHash: event.txHash,
    },
  };
}

export default function LidoStakingModuleTimeline({ stakingModuleId }) {
  const { data, loading } = useLidoStakingModuleTimelineData(stakingModuleId);
  const timeline = sortTimelineEvents(data).map((event) =>
    toTimelineItem(event),
  );

  return (
    <Timeline
      timeline={timeline}
      loading={loading}
      IconComponent={TimelineItemIcon}
      FieldsComponent={StakingModuleTimelineItemFields}
    />
  );
}
