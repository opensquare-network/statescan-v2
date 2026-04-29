import EvmAddress from "./evmAddress";
import LidoValue from "./value";
import Timeline from "../timeline";
import TimelineItemFields from "../timeline/itemFields";
import TimelineItemIcon from "../timeline/itemIcon";
import { DetailedTime } from "../styled/time";
import EvmTxHash from "./evmTxHash";
import LidoRequestId from "./requestId";
import useChainSettings from "../../utils/hooks/chain/useChainSettings";
import { toLidoTimestamp } from "../../utils/viewFuncs/lido";

function toTimestampDetail(timestamp) {
  if (!timestamp) {
    return "--";
  }

  return <DetailedTime ts={Number(timestamp) * 1000} />;
}

function toBaseEventRows(event, itemId, eventName) {
  const rows = [
    event.requestId && [
      "Request ID",
      <LidoRequestId requestId={event.requestId} />,
    ],
    [
      "Tx Hash",
      <EvmTxHash txHash={event.txHash} key={`${itemId}-${eventName}-tx`} />,
    ],
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
    ["Request ID", <LidoRequestId requestId={event.requestId || event.id} />],
    ...toBaseEventRows(event, itemId, "request").filter(
      ([label]) => label !== "Request ID",
    ),
    toValueRow("Value", event.value, chainSettings),
    toValueRow("Shares", event.shares, {
      decimals: chainSettings.decimals,
      symbol: "",
    }),
  ].filter(Boolean);
}

function toFinalizationRows(event, itemId, chainSettings) {
  if (!event) {
    return [];
  }

  return [
    ...toBaseEventRows(event, itemId, "finalization"),
    ["From Request ID", <LidoRequestId requestId={event.fromRequestId} />],
    ["To Request ID", <LidoRequestId requestId={event.toRequestId} />],
    event.timestamp && ["Time", toTimestampDetail(event.timestamp)],
    toValueRow("Value", event.value, chainSettings),
    toValueRow("Shares", event.shares, {
      decimals: chainSettings.decimals,
      symbol: "",
    }),
  ].filter(Boolean);
}

function toClaimRows(event, itemId, chainSettings) {
  if (!event) {
    return [];
  }

  return [
    ...toBaseEventRows(event, itemId, "claim"),
    ["Owner", <EvmAddress address={event.owner} />],
    ["Receiver", <EvmAddress address={event.receiver} />],
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

export default function LidoWithdrawalTimeline({ withdrawal }) {
  const chainSettings = useChainSettings();
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
