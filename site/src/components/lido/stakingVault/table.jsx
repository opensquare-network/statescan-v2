import isNil from "lodash.isnil";
import ValueDisplay from "../../displayValue";
import EvmAddress from "../evmAddress";
import Pagination from "../../pagination";
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
import useChainSettings from "../../../utils/hooks/chain/useChainSettings";
import { useQueryParams } from "../../../hooks/useQueryParams";

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
    width: 200,
  },
  { name: "Operator", width: 200 },
  { name: "Status", align: "right", width: 120 },
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
      <ColoredMonoLink to={`/staking/vaults/${id}`}>
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

function useLidoStakingVaultsTableData(items = []) {
  const { decimals, symbol } = useChainSettings();

  return items.map((item) => {
    const id = item.vault;
    const report = item.lastReport;

    return [
      <span key={`${id}-id`}>{renderVaultId(id)}</span>,
      renderValue(report?.reportTotalValue, decimals, symbol, `${id}-total`),
      <LidoInOutDelta
        key={`${id}-in-out-delta`}
        value={report?.reportInOutDelta}
        decimals={decimals}
        symbol={symbol}
      />,
      formatLidoBp(item.reserveRatioBP),
      toLidoTimestamp(report?.indexer?.blockTimestamp),
      renderAddress(id, "node-operator", item.nodeOperator),
      <LidoVaultStatus key={`${id}-status`} status={item.status} />,
    ];
  });
}

export default function LidoStakingVaultsTable({ data, loading }) {
  const { page = 1 } = useQueryParams();
  const tableData = useLidoStakingVaultsTableData(data?.items);

  return (
    <StyledPanelTableWrapper
      footer={
        <Pagination
          page={parseInt(page)}
          pageSize={data?.limit}
          total={data?.total}
        />
      }
    >
      <Table heads={lidoStakingVaultsHead} data={tableData} loading={loading} />
    </StyledPanelTableWrapper>
  );
}
