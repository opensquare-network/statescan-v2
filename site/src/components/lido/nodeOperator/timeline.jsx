import isNil from "lodash.isnil";
import styled from "styled-components";
import Timeline from "../../timeline";
import TimelineItemFields from "../../timeline/itemFields";
import TimelineItemIcon from "../../timeline/itemIcon";
import { toAddressRow, toIntegerRow } from "../timelineRows";
import { toLidoTimestamp } from "../../../utils/viewFuncs/lido";
import { sortTimelineEvents } from "../stakingVault/utils";

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

function toActiveSetRows(event) {
  const payload = event.nodeOperatorActiveSet;

  return [!isNil(payload?.active) && ["Active", String(payload.active)]].filter(
    Boolean,
  );
}

function toAddedRows(event) {
  const payload = event.nodeOperatorAdded;

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

function toNameSetRows(event) {
  const payload = event.nodeOperatorNameSet;

  return [payload?.name && ["Name", payload.name]].filter(Boolean);
}

function toVettedSigningKeysCountChangedRows(event) {
  const payload = event.nodeOperatorVettedSigningKeysCountChanged;

  return [
    toIntegerRow("Vetted Signing Keys Count", payload?.vettedSigningKeysCount),
  ].filter(Boolean);
}

function toEventRows(event) {
  if (event.nodeOperatorActiveSet) {
    return toActiveSetRows(event);
  } else if (event.nodeOperatorAdded) {
    return toAddedRows(event);
  } else if (event.nodeOperatorNameSet) {
    return toNameSetRows(event);
  } else if (event.nodeOperatorVettedSigningKeysCountChanged) {
    return toVettedSigningKeysCountChangedRows(event);
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

export default function LidoNodeOperatorTimeline({ data = [], loading }) {
  const timeline = sortTimelineEvents(data).map((event) =>
    toTimelineItem(event),
  );

  return (
    <Timeline
      timeline={timeline}
      loading={loading}
      IconComponent={TimelineItemIcon}
      FieldsComponent={NodeOperatorTimelineItemFields}
    />
  );
}
