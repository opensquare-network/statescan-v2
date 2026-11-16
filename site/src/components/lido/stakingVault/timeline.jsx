import isNil from "lodash.isnil";
import Timeline from "../../timeline";
import TimelineItemFields from "../../timeline/itemFields";
import TimelineItemIcon from "../../timeline/itemIcon";
import LidoInOutDelta from "./inOutDelta";
import LidoValue from "../value";
import { toAddressRow, toBpRow } from "../timelineRows";
import useChainSettings from "../../../utils/hooks/chain/useChainSettings";
import { toLidoTimestamp } from "../../../utils/viewFuncs/lido";

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

function toDashboardCreatedRows(payload) {
  return [
    toAddressRow("Admin", payload?.admin),
    toAddressRow("Dashboard", payload?.dashboard),
  ].filter(Boolean);
}

function toVaultConnectedRows(payload, chainSettings) {
  return [
    toValueRow("Share Limit", payload?.shareLimit, chainSettings),
    toBpRow("Reserve Ratio", payload?.reserveRatioBP),
    toBpRow("Infra Fee", payload?.infraFeeBP),
    toBpRow("Liquidity Fee", payload?.liquidityFeeBP),
    toBpRow("Reservation Fee", payload?.reservationFeeBP),
    toBpRow("Rebalance Threshold", payload?.rebalanceThresholdBP),
  ].filter(Boolean);
}

function toConnectionUpdatedRows(payload, chainSettings) {
  return [
    toAddressRow("Node Operator", payload?.nodeOperator),
    toValueRow("Share Limit", payload?.shareLimit, chainSettings),
    toBpRow("Reserve Ratio", payload?.reserveRatioBP),
    toBpRow("Rebalance Threshold", payload?.rebalanceThresholdBP),
  ].filter(Boolean);
}

function toDisconnectAbortedRows(payload, chainSettings) {
  return [
    toValueRow("Slashing Reserve", payload?.slashingReserve, chainSettings),
  ].filter(Boolean);
}

function toFeesUpdatedRows(payload) {
  return [
    toBpRow("Infra Fee", payload?.infraFeeBP),
    toBpRow("Previous Infra Fee", payload?.previousInfraFeeBP),
    toBpRow("Liquidity Fee", payload?.liquidityFeeBP),
    toBpRow("Previous Liquidity Fee", payload?.previousLiquidityFeeBP),
    toBpRow("Reservation Fee", payload?.reservationFeeBP),
    toBpRow("Previous Reservation Fee", payload?.previousReservationFeeBP),
  ].filter(Boolean);
}

function toReportAppliedRows(payload, chainSettings) {
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

function toServerReportAppliedPayload(event) {
  return {
    totalValue: event.reportTotalValue,
    inOutDelta: event.reportInOutDelta,
    cumulativeLidoFees: event.reportCumulativeLidoFees,
    slashingReserve: event.reportSlashingReserve,
    liabilityShares: event.reportLiabilityShares,
    maxLiabilityShares: event.reportMaxLiabilityShares,
  };
}

function toEventRows(event, chainSettings) {
  if (event.eventName === "DashboardCreated") {
    return toDashboardCreatedRows(event);
  }

  if (event.eventName === "VaultConnected") {
    return toVaultConnectedRows(event, chainSettings);
  }

  if (event.eventName === "VaultConnectionUpdated") {
    return toConnectionUpdatedRows(event, chainSettings);
  }

  if (event.eventName === "VaultDisconnectAborted") {
    return toDisconnectAbortedRows(event, chainSettings);
  }

  if (event.eventName === "VaultFeesUpdated") {
    return toFeesUpdatedRows(event);
  }

  if (event.eventName === "VaultReportApplied") {
    return toReportAppliedRows(
      toServerReportAppliedPayload(event),
      chainSettings,
    );
  }

  return [];
}

function toTimelineItem(event, chainSettings) {
  return {
    name: event.eventName,
    event,
    rows: toEventRows(event, chainSettings),
    indexer: {
      blockTime: toLidoTimestamp(event.indexer?.blockTimestamp),
      blockHeight: event.indexer?.blockNumber,
      txHash: event.indexer?.txHash,
    },
  };
}

export default function LidoStakingVaultTimeline({ vault }) {
  const chainSettings = useChainSettings();
  const timeline = (vault.timeline || []).map((event) =>
    toTimelineItem(event, chainSettings),
  );

  return (
    <Timeline
      timeline={timeline}
      IconComponent={TimelineItemIcon}
      FieldsComponent={TimelineItemFields}
    />
  );
}
