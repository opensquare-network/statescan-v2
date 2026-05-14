import isNil from "lodash.isnil";
import ValueDisplay from "../../displayValue";
import EvmAddress from "../evmAddress";
import EvmPagination from "../evmPagination";
import LidoInOutDelta from "./inOutDelta";
import LidoVaultStatus from "./status";
import { StyledPanelTableWrapper } from "../../styled/panel";
import { ColoredMonoLink } from "../../styled/link";
import Table from "../../table";
import Tooltip from "../../tooltip";
import { hashEllipsis } from "../../../utils/viewFuncs/text";
import {
  formatLidoBp,
  toLidoAmount,
  toLidoTimestamp,
} from "../../../utils/viewFuncs/lido";

const lidoStakingVaultsHead = [
  { name: "Vault", width: 140 },
  {
    name: "Total",
    align: "right",
    width: 160,
  },
  {
    name: "In/Out Delta",
    align: "right",
    width: 160,
  },
  {
    name: "Reserve",
    align: "right",
    width: 120,
  },
  {
    name: { time: "Last Report Time", age: "Last Reported" },
    type: "time",
    width: 180,
  },
  { name: "Operator", width: 200 },
  { name: "Status", width: 120 },
];

function renderAddress(id, field, address) {
  return (
    <EvmAddress
      key={`${id}-${field}`}
      address={address}
      copy={false}
      maxWidth="150px"
    />
  );
}

function renderVaultId(id) {
  return (
    <Tooltip tip={id}>
      <ColoredMonoLink to={`/staking-vaults/${id}`}>
        {hashEllipsis(id, 4, 4)}
      </ColoredMonoLink>
    </Tooltip>
  );
}

function renderValue(value, decimals, symbol, key) {
  if (isNil(value)) {
    return "--";
  }

  return (
    <ValueDisplay
      key={key}
      value={toLidoAmount(value, decimals)}
      symbol={symbol}
      showNotEqualTooltip
    />
  );
}

function toLidoStakingVaultsTableData(items = [], { decimals, symbol }) {
  return items.map((item) => {
    const timelines = item.timelines || [];
    const report = item.lastReport;
    const vaultCreated = timelines.find((t) => t.eventType === "VaultCreated");

    return [
      <span key={`${item.id}-id`}>{renderVaultId(item.id)}</span>,
      renderValue(report?.totalValue, decimals, symbol, `${item.id}-total`),
      <LidoInOutDelta
        key={`${item.id}-in-out-delta`}
        value={report?.inOutDelta}
        decimals={decimals}
        symbol={symbol}
      />,
      formatLidoBp(item.reserveRatioBP),
      toLidoTimestamp(report?.blockTime || vaultCreated?.blockTime),
      renderAddress(item.id, "node-operator", item.nodeOperator),
      <LidoVaultStatus key={`${item.id}-status`} status={item.status} />,
    ];
  });
}

export default function LidoStakingVaultsTable({
  data,
  loading,
  chainSettings,
}) {
  const tableData = toLidoStakingVaultsTableData(data?.items, chainSettings);

  return (
    <StyledPanelTableWrapper
      footer={<EvmPagination nextCursor={data?.nextCursor} />}
    >
      <Table heads={lidoStakingVaultsHead} data={tableData} loading={loading} />
    </StyledPanelTableWrapper>
  );
}
