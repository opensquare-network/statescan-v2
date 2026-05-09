import isNil from "lodash.isnil";
import Timeline from "../../timeline";
import TimelineItemFields from "../../timeline/itemFields";
import TimelineItemIcon from "../../timeline/itemIcon";
import EvmAddress from "../evmAddress";
import LidoInOutDelta from "./inOutDelta";
import LidoValue from "../value";
import useChainSettings from "../../../utils/hooks/chain/useChainSettings";
import { formatLidoBp, toLidoTimestamp } from "../../../utils/viewFuncs/lido";
import { sortTimelineEvents } from "./utils";

function toValueRow(label, value, { decimals, symbol }) {
  if (isNil(value)) {
    return null;
  }

  return [
    label,
    <LidoValue value={value} decimals={decimals} symbol={symbol} />,
  ];
}

function toInOutDeltaRow(label, value, { decimals, symbol }) {
  if (isNil(value)) {
    return null;
  }

  return [
    label,
    <LidoInOutDelta value={value} decimals={decimals} symbol={symbol} />,
  ];
}

function toBpRow(label, value) {
  if (isNil(value)) {
    return null;
  }

  return [label, formatLidoBp(value)];
}

function toDashboardCreatedRows(event) {
  const payload = event.dashboardCreated;

  return [
    payload?.admin && ["Admin", <EvmAddress address={payload.admin} />],
    payload?.dashboard && [
      "Dashboard",
      <EvmAddress address={payload.dashboard} />,
    ],
  ].filter(Boolean);
}

function toVaultConnectedRows(event, chainSettings) {
  const payload = event.vaultConnected;

  return [
    toValueRow("Share Limit", payload?.shareLimit, chainSettings),
    toBpRow("Reserve Ratio", payload?.reserveRatioBP),
    toBpRow("Infra Fee", payload?.infraFeeBP),
    toBpRow("Liquidity Fee", payload?.liquidityFeeBP),
    toBpRow("Reservation Fee", payload?.reservationFeeBP),
    toBpRow("Rebalance Threshold", payload?.rebalanceThresholdBP),
  ].filter(Boolean);
}

function toConnectionUpdatedRows(event, chainSettings) {
  const payload = event.vaultConnectionUpdated;

  return [
    payload?.nodeOperator && [
      "Node Operator",
      <EvmAddress address={payload.nodeOperator} />,
    ],
    toValueRow("Share Limit", payload?.shareLimit, chainSettings),
    toBpRow("Reserve Ratio", payload?.reserveRatioBP),
    toBpRow("Rebalance Threshold", payload?.rebalanceThresholdBP),
  ].filter(Boolean);
}

function toDisconnectAbortedRows(event, chainSettings) {
  const payload = event.vaultDisconnectAborted;

  return [
    toValueRow("Slashing Reserve", payload?.slashingReserve, chainSettings),
  ].filter(Boolean);
}

function toFeesUpdatedRows(event) {
  const payload = event.vaultFeesUpdated;

  return [
    toBpRow("Infra Fee", payload?.infraFeeBP),
    toBpRow("Previous Infra Fee", payload?.previousInfraFeeBP),
    toBpRow("Liquidity Fee", payload?.liquidityFeeBP),
    toBpRow("Previous Liquidity Fee", payload?.previousLiquidityFeeBP),
    toBpRow("Reservation Fee", payload?.reservationFeeBP),
    toBpRow("Previous Reservation Fee", payload?.previousReservationFeeBP),
  ].filter(Boolean);
}

function toReportAppliedRows(event, chainSettings) {
  const payload = event.vaultReportApplied;

  return [
    toValueRow("Total Value", payload?.totalValue, chainSettings),
    toInOutDeltaRow("In/Out Delta", payload?.inOutDelta, chainSettings),
    toValueRow(
      "Cumulative Lido Fees",
      payload?.cumulativeLidoFees,
      chainSettings,
    ),
    toValueRow("Slashing Reserve", payload?.slashingReserve, chainSettings),
    toValueRow("Liability Shares", payload?.liabilityShares, {
      decimals: chainSettings.decimals,
      symbol: "",
    }),
    toValueRow("Max Liability Shares", payload?.maxLiabilityShares, {
      decimals: chainSettings.decimals,
      symbol: "",
    }),
  ].filter(Boolean);
}

function toEventRows(event, chainSettings) {
  if (event.dashboardCreated) {
    return toDashboardCreatedRows(event);
  }

  if (event.vaultConnected) {
    return toVaultConnectedRows(event, chainSettings);
  }

  if (event.vaultConnectionUpdated) {
    return toConnectionUpdatedRows(event, chainSettings);
  }

  if (event.vaultDisconnectAborted) {
    return toDisconnectAbortedRows(event, chainSettings);
  }

  if (event.vaultFeesUpdated) {
    return toFeesUpdatedRows(event);
  }

  if (event.vaultReportApplied) {
    return toReportAppliedRows(event, chainSettings);
  }

  return [];
}

function toTimelineItem(event, chainSettings) {
  return {
    name: event.eventType || "--",
    event,
    rows: toEventRows(event, chainSettings),
    indexer: {
      blockTime: toLidoTimestamp(event.blockTime),
      blockHeight: event.blockNumber,
      txHash: event.txHash,
    },
  };
}

function LidoTimelineItemFields({ item }) {
  return <TimelineItemFields fields={item.rows} />;
}

export default function LidoStakingVaultTimeline({ vault }) {
  const chainSettings = useChainSettings();
  const timeline = sortTimelineEvents(vault?.timelines).map((event) =>
    toTimelineItem(event, chainSettings),
  );

  return (
    <Timeline
      timeline={timeline}
      IconComponent={TimelineItemIcon}
      FieldsComponent={LidoTimelineItemFields}
    />
  );
}
