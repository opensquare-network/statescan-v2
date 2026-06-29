import EvmAddress from "../evmAddress";
import LidoEarnStatus from "./status";
import { EarnDetailSharesValue, EarnDetailValue } from "./value";
import Timeline from "../../timeline";
import TimelineItemFields from "../../timeline/itemFields";
import TimelineItemIcon from "../../timeline/itemIcon";
import { toLidoTimestamp } from "../../../utils/viewFuncs/lido";
import { EARN_SHARES_DECIMALS, EarnTime } from "./common";

function toRequestRows(redeem) {
  return [
    ["Request Time", <EarnTime time={redeem.requestTime} />],
    ["Account", <EvmAddress address={redeem.account} />],
    ["Asset", <EvmAddress address={redeem.asset} />],
    ["Vault", <EvmAddress address={redeem.vault} />],
    ["Queue", <EvmAddress address={redeem.queue} />],
    ["Shares", <EarnDetailSharesValue value={redeem.shares} />],
    ["Status", <LidoEarnStatus status={redeem.status} />],
  ].filter(Boolean);
}

function toClaimRows(claimed) {
  if (!claimed) {
    return [];
  }

  return [
    ["Account", <EvmAddress address={claimed.account} />],
    ["Receiver", <EvmAddress address={claimed.receiver} />],
    ["Asset", <EvmAddress address={claimed.asset} />],
    ["Vault", <EvmAddress address={claimed.vault} />],
    ["Queue", <EvmAddress address={claimed.queue} />],
    [
      "Assets",
      <EarnDetailValue
        value={claimed.assets}
        decimals={EARN_SHARES_DECIMALS}
        symbol="wstETH"
      />,
    ],
    ["Request Time", <EarnTime time={claimed.requestTime} />],
  ].filter(Boolean);
}

function toTimelineItem({ name, event, rows }) {
  return {
    name,
    event,
    rows,
    indexer: {
      blockTime: toLidoTimestamp(event?.requestTime),
      blockHeight: event?.blockNumber,
      txHash: event?.txHash,
    },
  };
}

export default function LidoEarnRedeemTimeline({ redeem }) {
  const timeline = [
    toTimelineItem({
      name: "Requested",
      event: redeem,
      rows: toRequestRows(redeem),
    }),
    redeem?.claimed &&
      toTimelineItem({
        name: "Claimed",
        event: redeem.claimed,
        rows: toClaimRows(redeem.claimed),
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
