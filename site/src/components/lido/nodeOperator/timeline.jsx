import isNil from "lodash.isnil";
import styled from "styled-components";
import Timeline from "../../timeline";
import TimelineItemFields from "../../timeline/itemFields";
import TimelineItemIcon from "../../timeline/itemIcon";
import { toAddressRow, toIntegerRow } from "../timelineRows";
import { toLidoTimestamp } from "../../../utils/viewFuncs/lido";

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
  return [
    toIntegerRow("Vetted Signing Keys Count", payload?.vettedSigningKeysCount),
  ].filter(Boolean);
}

function toServerVettedSigningKeysCountPayload(event) {
  return {
    vettedSigningKeysCount: event.approvedValidatorsCount,
  };
}

function toEventRows(event) {
  if (event.eventName === "NodeOperatorActiveSet") {
    return toActiveSetRows(event);
  }

  if (event.eventName === "NodeOperatorAdded") {
    return toAddedRows(event);
  }

  if (event.eventName === "NodeOperatorNameSet") {
    return toNameSetRows(event);
  }

  if (event.eventName === "NodeOperatorVettedSigningKeysCountChanged") {
    return toVettedSigningKeysCountChangedRows(
      toServerVettedSigningKeysCountPayload(event),
    );
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
