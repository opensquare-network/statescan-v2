import EvmAddress from "./evmAddress";
import LidoValue from "./value";
import Timeline from "../timeline";
import TimelineItemFields from "../timeline/itemFields";
import TimelineItemIcon from "../timeline/itemIcon";
import EvmTxHash from "./evmTxHash";
import LidoRequestId from "./requestId";
import useChainSettings from "../../utils/hooks/chain/useChainSettings";
import { toLidoTimestamp } from "../../utils/viewFuncs/lido";

const EVENT_NAMES = {
  WithdrawalRequested: "Requested",
  WithdrawalsFinalized: "Finalized",
  WithdrawalClaimed: "Claimed",
};

function toBaseEventRows(event) {
  const rows = [
    event.requestId && [
      "Request ID",
      <LidoRequestId requestId={event.requestId} />,
    ],
    ["Tx Hash", <EvmTxHash txHash={event.indexer?.txHash} />],
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

function toRequestRows(event, chainSettings) {
  if (!event) {
    return [];
  }

  return [
    ...toBaseEventRows(event),
    ["Requester", <EvmAddress address={event.requester} />],
    ["Owner", <EvmAddress address={event.owner} />],
    toValueRow("Value", event.amountOfStETH, chainSettings),
    toValueRow("Shares", event.amountOfShares, {
      decimals: chainSettings.decimals,
      symbol: "",
    }),
  ].filter(Boolean);
}

function toFinalizationRows(event, chainSettings) {
  if (!event) {
    return [];
  }

  return [
    ...toBaseEventRows(event),
    ["From Request ID", <LidoRequestId requestId={event.fromRequestId} />],
    ["To Request ID", <LidoRequestId requestId={event.toRequestId} />],
    toValueRow("Value", event.amountOfETHLocked, chainSettings),
    toValueRow("Shares", event.sharesToBurn, {
      decimals: chainSettings.decimals,
      symbol: "",
    }),
  ].filter(Boolean);
}

function toClaimRows(event, chainSettings) {
  if (!event) {
    return [];
  }

  return [
    ...toBaseEventRows(event),
    ["Owner", <EvmAddress address={event.owner} />],
    ["Receiver", <EvmAddress address={event.receiver} />],
    toValueRow("Value", event.amountOfETH, chainSettings),
  ].filter(Boolean);
}

function toRows(event, chainSettings) {
  if (event.eventName === "WithdrawalsFinalized") {
    return toFinalizationRows(event, chainSettings);
  }

  if (event.eventName === "WithdrawalClaimed") {
    return toClaimRows(event, chainSettings);
  }

  return toRequestRows(event, chainSettings);
}

function toTimelineItem({ name, event, rows }) {
  return {
    name,
    event,
    rows,
    indexer: {
      blockTime: toLidoTimestamp(event?.indexer?.blockTimestamp),
      blockHeight: event?.indexer?.blockNumber,
      txHash: event?.indexer?.txHash,
    },
  };
}

export default function LidoWithdrawalTimeline({ withdrawal }) {
  const chainSettings = useChainSettings();
  const timeline = (withdrawal?.timeline || []).map((event) =>
    toTimelineItem({
      name: EVENT_NAMES[event.eventName] || event.eventName,
      event,
      rows: toRows(event, chainSettings),
    }),
  );

  return (
    <Timeline
      timeline={timeline}
      IconComponent={TimelineItemIcon}
      FieldsComponent={TimelineItemFields}
    />
  );
}
