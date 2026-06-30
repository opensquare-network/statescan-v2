import EvmAddress from "../evmAddress";
import LidoEarnStatus from "./status";
import { EarnDetailAssetValue, EarnDetailSharesValue } from "./value";
import Timeline from "../../timeline";
import TimelineItemFields from "../../timeline/itemFields";
import TimelineItemIcon from "../../timeline/itemIcon";
import { toLidoTimestamp } from "../../../utils/viewFuncs/lido";
import { EarnTime } from "./common";

function toAssetValueRow(label, value, asset) {
  return [label, <EarnDetailAssetValue value={value} asset={asset} />];
}

function toRequestRows(deposit) {
  return [
    ["Request Time", <EarnTime time={deposit.requestTime} />],
    ["Account", <EvmAddress address={deposit.account} />],
    ["Asset", <EvmAddress address={deposit.asset} />],
    ["Vault", <EvmAddress address={deposit.vault} />],
    ["Queue", <EvmAddress address={deposit.queue} />],
    ["Referral", <EvmAddress address={deposit.referral} />],
    toAssetValueRow("Assets", deposit.assets, deposit.asset),
    ["Status", <LidoEarnStatus status={deposit.status} />],
  ].filter(Boolean);
}

function toClaimRows(claimed) {
  if (!claimed) {
    return [];
  }

  return [
    ["Account", <EvmAddress address={claimed.account} />],
    ["Asset", <EvmAddress address={claimed.asset} />],
    ["Vault", <EvmAddress address={claimed.vault} />],
    ["Queue", <EvmAddress address={claimed.queue} />],
    ["Request Time", <EarnTime time={claimed.requestTime} />],
    ["Shares", <EarnDetailSharesValue value={claimed.shares} />],
  ].filter(Boolean);
}

function toCancelRows(canceled) {
  if (!canceled) {
    return [];
  }

  return [
    ["Account", <EvmAddress address={canceled.account} />],
    ["Asset", <EvmAddress address={canceled.asset} />],
    ["Vault", <EvmAddress address={canceled.vault} />],
    ["Queue", <EvmAddress address={canceled.queue} />],
    ["Request Time", <EarnTime time={canceled.requestTime} />],
    toAssetValueRow("Assets", canceled.assets, canceled.asset),
  ].filter(Boolean);
}

function toTimelineItem({ name, event, rows }) {
  return {
    name,
    event,
    rows,
    indexer: {
      blockTime: toLidoTimestamp(event?.requestTime),
      blockHeight: event?.indexer?.blockNumber,
      txHash: event?.indexer?.txHash,
    },
  };
}

export default function LidoEarnDepositTimeline({ deposit }) {
  const timeline = [
    toTimelineItem({
      name: "Requested",
      event: deposit,
      rows: toRequestRows(deposit),
    }),
    deposit?.canceled &&
      toTimelineItem({
        name: "Canceled",
        event: deposit.canceled,
        rows: toCancelRows(deposit.canceled),
      }),
    deposit?.claimed &&
      toTimelineItem({
        name: "Claimed",
        event: deposit.claimed,
        rows: toClaimRows(deposit.claimed),
      }),
  ].filter(Boolean);

  return (
    <Timeline
      timeline={timeline}
      IconComponent={TimelineItemIcon}
      FieldsComponent={TimelineItemFields}
    />
  );
}
