import isNil from "lodash.isnil";
import styled from "styled-components";
import List from "../../list";
import EvmAddress from "../evmAddress";
import EvmExternalLink from "../evmExternalLink";
import LidoInOutDelta from "./inOutDelta";
import LidoValue from "../value";
import LidoVaultStatus from "./status";
import { DetailedTime } from "../../styled/time";
import {
  formatLidoBp,
  getEtherscanAddressUrl,
  toLidoTimestamp,
} from "../../../utils/viewFuncs/lido";
import { hashEllipsis } from "../../../utils/viewFuncs/text";
import useChainSettings from "../../../utils/hooks/chain/useChainSettings";
import { Overpass_Mono_14_500 } from "../../../styles/text";

const VaultLink = styled(EvmExternalLink)`
  ${Overpass_Mono_14_500};
`;

function toTime(timestamp) {
  const time = toLidoTimestamp(timestamp);

  return time ? <DetailedTime ts={time} /> : "--";
}

function toValue(value, { decimals, symbol }) {
  if (isNil(value)) {
    return "--";
  }

  return <LidoValue value={value} decimals={decimals} symbol={symbol} />;
}

function toVaultId(id) {
  return (
    <VaultLink
      href={getEtherscanAddressUrl(id)}
      copyContent={id}
      tooltipContent={id}
    >
      {hashEllipsis(id, 4, 4)}
    </VaultLink>
  );
}

function useVaultDetailItems(vault) {
  const chainSettings = useChainSettings();
  const { decimals, symbol } = chainSettings;
  const report = vault.lastReport;

  return [
    { label: "Vault", value: toVaultId(vault.id) },
    { label: "Status", value: <LidoVaultStatus status={vault.status} /> },
    {
      label: "Total",
      value: toValue(report?.totalValue, chainSettings),
    },
    {
      label: "In/Out Delta",
      value: (
        <LidoInOutDelta
          value={report?.inOutDelta}
          decimals={decimals}
          symbol={symbol}
        />
      ),
    },
    { label: "Reserve", value: formatLidoBp(vault.reserveRatioBP) },
    {
      label: "Last Report",
      value: toTime(vault.lastReport?.blockTime),
    },
    {
      label: "Share Limit",
      value: toValue(vault.shareLimit, chainSettings),
    },
    {
      label: "Forced Rebalance Threshold",
      value: formatLidoBp(vault.forcedRebalanceThresholdBP),
    },
    { label: "Infra Fee", value: formatLidoBp(vault.infraFeeBP) },
    { label: "Liquidity Fee", value: formatLidoBp(vault.liquidityFeeBP) },
    { label: "Reservation Fee", value: formatLidoBp(vault.reservationFeeBP) },
    {
      label: "Node Operator",
      value: <EvmAddress address={vault.nodeOperator} />,
    },
    { label: "Admin", value: <EvmAddress address={vault.admin} /> },
    {
      label: "Dashboard",
      value: <EvmAddress address={vault.dashboard} />,
    },
  ];
}

export default function LidoStakingVaultDetailList({ vault }) {
  return <List data={useVaultDetailItems(vault)} />;
}
