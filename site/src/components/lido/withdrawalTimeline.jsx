import styled from "styled-components";
import Timeline from "../timeline";
import TimelineItemIcon from "../timeline/itemIcon";
import LidoValue from "./value";
import TimelineItemFields from "../timeline/itemFields";
import { DetailedTime } from "../styled/time";
import { TextSecondary } from "../styled/text";
import { withCopy } from "../../HOC/withCopy";
import { LidoEtherscanLinkWithCopy } from "./etherscanLink";
import {
  getEtherscanBlockUrl,
  getEtherscanTxUrl,
  toLidoBlockNumber,
  toLidoTimestamp,
} from "../../utils/viewFuncs/lido";

const TextSecondaryWithCopy = withCopy(TextSecondary);

const LidoTimelineHeaderWrapper = styled.div`
  min-width: 120px;
  padding: 8px 48px 24px 0;

  @media screen and (max-width: 900px) {
    padding: 8px 0 8px 0;
    min-width: auto;
  }
`;

const CompactTimelineItemFields = styled(TimelineItemFields)`
  padding-bottom: 8px;

  > div > div:first-child {
    min-width: 72px;
    padding: 4px 0;
  }

  > div > div:last-child {
    padding: 4px 0 4px 12px;
  }

  @media screen and (max-width: 900px) {
    > div > div:last-child {
      padding-left: 0;
    }
  }
`;

const TimelineTitle = styled.div`
  color: ${(p) => p.theme.fontPrimary};
  font-weight: 600;
`;

function toTimeDetail(blockTime) {
  const timestamp = toLidoTimestamp(blockTime);
  return timestamp ? <DetailedTime ts={timestamp} /> : "--";
}

function toBlockDetail(blockNumber, key) {
  if (!blockNumber) {
    return "--";
  }

  return (
    <LidoEtherscanLinkWithCopy
      href={getEtherscanBlockUrl(blockNumber)}
      key={key}
      render={toLidoBlockNumber}
    >
      {blockNumber}
    </LidoEtherscanLinkWithCopy>
  );
}

function toTxHashDetail(txHash, key) {
  if (!txHash) {
    return "--";
  }

  return (
    <LidoEtherscanLinkWithCopy href={getEtherscanTxUrl(txHash)} key={key}>
      {txHash}
    </LidoEtherscanLinkWithCopy>
  );
}

function toCopyText(value) {
  if (!value) {
    return "--";
  }

  return <TextSecondaryWithCopy>{value}</TextSecondaryWithCopy>;
}

function toBaseEventRows(event, itemId, eventName) {
  const rows = [
    event.requestId && ["Request ID", toCopyText(event.requestId)],
    ["Time", toTimeDetail(event.blockTime)],
    ["Block", toBlockDetail(event.blockNumber, `${itemId}-${eventName}-block`)],
    ["Tx Hash", toTxHashDetail(event.txHash, `${itemId}-${eventName}-tx`)],
  ];

  return rows.filter(Boolean);
}

function toValueRow(label, value, { decimals, symbol }) {
  if (!value) {
    return null;
  }

  return [
    label,
    <LidoValue value={value} decimals={decimals} symbol={symbol} />,
  ];
}

function toRequestRows(event, itemId, chainSettings) {
  if (!event) {
    return [];
  }

  return [
    ["Request ID", toCopyText(event.requestId || event.id)],
    ...toBaseEventRows(event, itemId, "request").filter(
      ([label]) => label !== "Request ID",
    ),
    toValueRow("Value", event.value, chainSettings),
    toValueRow("Shares", event.shares, chainSettings),
  ].filter(Boolean);
}

function toFinalizationRows(event, itemId, chainSettings) {
  if (!event) {
    return [];
  }

  return [
    ...toBaseEventRows(event, itemId, "finalization"),
    ["From Request ID", toCopyText(event.fromRequestId)],
    ["To Request ID", toCopyText(event.toRequestId)],
    event.timestamp && ["Timestamp", toCopyText(event.timestamp)],
    toValueRow("Value", event.value, chainSettings),
    toValueRow("Shares", event.shares, chainSettings),
  ].filter(Boolean);
}

function toClaimRows(event, itemId, chainSettings) {
  if (!event) {
    return [];
  }

  return [
    ...toBaseEventRows(event, itemId, "claim"),
    ["Owner", toCopyText(event.owner)],
    ["Receiver", toCopyText(event.receiver)],
    toValueRow("Value", event.value, chainSettings),
  ].filter(Boolean);
}

export default function LidoWithdrawalTimeline({ withdrawal, chainSettings }) {
  const request = withdrawal?.request || withdrawal;
  const timeline = [
    {
      name: "Pending",
      event: request,
      rows: toRequestRows(request, withdrawal?.id, chainSettings),
    },
    {
      name: "Finalized",
      event: withdrawal?.finalization,
      rows: toFinalizationRows(
        withdrawal?.finalization,
        withdrawal?.id,
        chainSettings,
      ),
    },
    {
      name: "Claimed",
      event: withdrawal?.claim,
      rows: toClaimRows(withdrawal?.claim, withdrawal?.id, chainSettings),
    },
  ].filter((step) => step.event);

  return (
    <Timeline
      timeline={timeline}
      IconComponent={TimelineItemIcon}
      HeaderComponent={LidoTimelineHeader}
      FieldsComponent={LidoTimelineFields}
    />
  );
}

function LidoTimelineHeader({ item }) {
  return (
    <LidoTimelineHeaderWrapper>
      <TimelineTitle>{item.name}</TimelineTitle>
    </LidoTimelineHeaderWrapper>
  );
}

function LidoTimelineFields({ item }) {
  return <CompactTimelineItemFields fields={item.rows} />;
}
