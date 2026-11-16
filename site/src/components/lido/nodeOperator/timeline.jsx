import isNil from "lodash.isnil";
import styled from "styled-components";
import ValueDisplay from "../../displayValue";
import Timeline from "../../timeline";
import TimelineItemFields from "../../timeline/itemFields";
import TimelineItemIcon from "../../timeline/itemIcon";
import { toAddressRow, toIntegerRow } from "../timelineRows";
import { toLidoAmount, toLidoTimestamp } from "../../../utils/viewFuncs/lido";

const NodeOperatorTimelineItemFields = styled(TimelineItemFields)`
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

function toActiveSetRows(payload) {
  return [!isNil(payload?.active) && ["Active", String(payload.active)]].filter(
    Boolean,
  );
}

function toAddedRows(payload) {
  return [
    toIntegerRow("Node Operator ID", payload?.nodeOperatorId),
    payload?.name && ["Name", payload.name],
    toAddressRow("Manager Address", payload?.managerAddress),
    toAddressRow("Reward Address", payload?.rewardAddress),
    !isNil(payload?.extendedManagerPermissions) && [
      "Extended Manager Permissions",
      String(payload.extendedManagerPermissions),
    ],
    toIntegerRow("Staking Limit", payload?.stakingLimit),
  ].filter(Boolean);
}

function toNameSetRows(payload) {
  return [payload?.name && ["Name", payload.name]].filter(Boolean);
}

function toVettedSigningKeysCountChangedRows(payload) {
  const vettedSigningKeysCount =
    payload?.vettedSigningKeysCount ?? payload?.approvedValidatorsCount;

  return [
    toIntegerRow("Vetted Signing Keys Count", vettedSigningKeysCount),
  ].filter(Boolean);
}

function toSharesValue(value) {
  if (isNil(value)) {
    return null;
  }

  return (
    <ValueDisplay
      value={toLidoAmount(value, 18)}
      symbol=""
      showNotEqualTooltip
    />
  );
}

function toRewardsDistributedRows(payload) {
  return [
    toAddressRow("Reward Address", payload?.rewardAddress),
    !isNil(payload?.sharesAmount) && [
      "Shares",
      toSharesValue(payload.sharesAmount),
    ],
  ].filter(Boolean);
}

function toOperatorFeeDistributedRows(payload) {
  return [
    !isNil(payload?.shares) && ["Shares", toSharesValue(payload.shares)],
  ].filter(Boolean);
}

function toOperatorRewardClaimedRows(payload) {
  return [
    toIntegerRow("Request ID", payload?.requestId),
    toAddressRow("Claim Address", payload?.claimAddress),
    payload?.type && ["Type", payload.type],
    !isNil(payload?.requestedAmount) && [
      "Requested Amount",
      toSharesValue(payload.requestedAmount),
    ],
    !isNil(payload?.claimedShares) && [
      "Claimed Shares",
      toSharesValue(payload.claimedShares),
    ],
    !isNil(payload?.claimedWstETHAmount) && [
      "Claimed wstETH",
      toSharesValue(payload.claimedWstETHAmount),
    ],
    !isNil(payload?.cumulativeFeeShares) && [
      "Cumulative Fee Shares",
      toSharesValue(payload.cumulativeFeeShares),
    ],
  ].filter(Boolean);
}

function toEventRows(event) {
  if (["NodeOperatorActiveSet", "ActiveSet"].includes(event.eventName)) {
    return toActiveSetRows(event);
  }

  if (event.eventName === "NodeOperatorAdded") {
    return toAddedRows(event);
  }

  if (["NodeOperatorNameSet", "NameSet"].includes(event.eventName)) {
    return toNameSetRows(event);
  }

  if (
    [
      "NodeOperatorVettedSigningKeysCountChanged",
      "VettedSigningKeysCountChanged",
    ].includes(event.eventName)
  ) {
    return toVettedSigningKeysCountChangedRows(event);
  }

  if (event.eventName === "RewardsDistributed") {
    return toRewardsDistributedRows(event);
  }

  if (event.eventName === "OperatorFeeDistributed") {
    return toOperatorFeeDistributedRows(event);
  }

  if (event.eventName === "OperatorRewardClaimed") {
    return toOperatorRewardClaimedRows(event);
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

export default function LidoNodeOperatorTimeline({ data = [], loading }) {
  const timeline = data.map((event) => toTimelineItem(event));

  return (
    <Timeline
      timeline={timeline}
      loading={loading}
      IconComponent={TimelineItemIcon}
      FieldsComponent={NodeOperatorTimelineItemFields}
    />
  );
}
