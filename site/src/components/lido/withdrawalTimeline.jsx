import LidoValue from "./value";
import Timeline from "../timeline";
import TimelineItemFields from "../timeline/itemFields";
import TimelineItemIcon from "../timeline/itemIcon";
import { TextSecondary } from "../styled/text";
import { withCopy } from "../../HOC/withCopy";
import { LidoEtherscanLinkWithCopy } from "./etherscanLink";
import { getEtherscanTxUrl, toLidoTimestamp } from "../../utils/viewFuncs/lido";

const TextSecondaryWithCopy = withCopy(TextSecondary);

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

function toTimelineItem({ name, event, rows }) {
  return {
    name,
    event,
    rows,
    indexer: {
      blockTime: toLidoTimestamp(event?.blockTime),
      blockHeight: event?.blockNumber,
    },
  };
}

export default function LidoWithdrawalTimeline({ withdrawal, chainSettings }) {
  const request = withdrawal?.request || withdrawal;
  const timeline = [
    toTimelineItem({
      name: "Pending",
      event: request,
      rows: toRequestRows(request, withdrawal?.id, chainSettings),
    }),
    withdrawal?.finalization &&
      toTimelineItem({
        name: "Finalized",
        event: withdrawal?.finalization,
        rows: toFinalizationRows(
          withdrawal?.finalization,
          withdrawal?.id,
          chainSettings,
        ),
      }),
    withdrawal?.claim &&
      toTimelineItem({
        name: "Claimed",
        event: withdrawal?.claim,
        rows: toClaimRows(withdrawal?.claim, withdrawal?.id, chainSettings),
      }),
  ].filter(Boolean);

  return (
    <Timeline
      timeline={timeline}
      IconComponent={TimelineItemIcon}
      FieldsComponent={LidoTimelineItemFields}
    />
  );
}

function LidoTimelineItemFields({ item }) {
  return <TimelineItemFields fields={item.rows} />;
}
