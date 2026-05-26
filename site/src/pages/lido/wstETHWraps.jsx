import BreadCrumb from "../../components/breadCrumb";
import ValueDisplay from "../../components/displayValue";
import Filter from "../../components/filter";
import Layout from "../../components/layout";
import EvmAddress from "../../components/lido/evmAddress";
import EvmExternalLink from "../../components/lido/evmExternalLink";
import EvmPagination from "../../components/lido/evmPagination";
import EvmTxHash from "../../components/lido/evmTxHash";
import { StyledPanelTableWrapper } from "../../components/styled/panel";
import Table from "../../components/table";
import { useLidoDepositsFilter } from "../../hooks/filter/useLidoDepositsFilter";
import {
  useLidoWstETHUnwrapsData,
  useLidoWstETHWrapsData,
} from "../../hooks/lido/useLidoWstETHWrapsData";
import {
  getEtherscanBlockUrl,
  toLidoAmount,
  toLidoBlockNumber,
  toLidoTimestamp,
} from "../../utils/viewFuncs/lido";

const lidoWstETHWrapsHead = [
  {
    name: "Block",
    type: "sortable",
    sortDefaultQueryValue: "blockNumber_desc",
    sortAscendingQueryValue: "blockNumber_asc",
    sortDescendingQueryValue: "blockNumber_desc",
    width: 160,
  },
  { name: "Address", width: 220 },
  {
    name: "Time",
    type: "time",
    width: 200,
  },
  { name: "Tx Hash", width: 220 },
  {
    name: "Value",
    type: "sortable",
    sortAscendingQueryValue: "value_asc",
    sortDescendingQueryValue: "value_desc",
    align: "right",
    width: 180,
  },
];

function toLidoWstETHWrapsTableData(items = []) {
  return items.map((item) => [
    <EvmExternalLink
      href={getEtherscanBlockUrl(item.blockNumber)}
      key={`${item.id}-block`}
      copy={false}
    >
      {toLidoBlockNumber(item.blockNumber)}
    </EvmExternalLink>,
    <EvmAddress
      key={`${item.id}-address`}
      address={item.address}
      copy={false}
    />,
    toLidoTimestamp(item.blockTime),
    <EvmTxHash key={`${item.id}-tx`} txHash={item.txHash} copy={false} />,
    <ValueDisplay
      key={`${item.id}-value`}
      value={toLidoAmount(item.value, 18)}
      symbol="wstETH"
      showNotEqualTooltip
    />,
  ]);
}

function LidoWstETHWrapEventsTableView({ data, loading }) {
  const tableData = toLidoWstETHWrapsTableData(data?.items);

  return (
    <StyledPanelTableWrapper
      footer={<EvmPagination nextCursor={data?.nextCursor} />}
    >
      <Table heads={lidoWstETHWrapsHead} data={tableData} loading={loading} />
    </StyledPanelTableWrapper>
  );
}

export function LidoWstETHWrapsTable({ filters }) {
  const { data, loading } = useLidoWstETHWrapsData({ filters });

  return <LidoWstETHWrapEventsTableView data={data} loading={loading} />;
}

export function LidoWstETHUnwrapsTable({ filters }) {
  const { data, loading } = useLidoWstETHUnwrapsData({ filters });

  return <LidoWstETHWrapEventsTableView data={data} loading={loading} />;
}

function LidoWstETHWrapEvents({ title, children }) {
  const filter = useLidoDepositsFilter();

  return (
    <Layout>
      <BreadCrumb data={[{ name: title }]} />

      <Filter data={filter} />

      {children}
    </Layout>
  );
}

export function LidoWstETHUnwraps() {
  return (
    <LidoWstETHWrapEvents title="wstETH Unwrap">
      <LidoWstETHUnwrapsTable />
    </LidoWstETHWrapEvents>
  );
}

export default function LidoWstETHWraps() {
  return (
    <LidoWstETHWrapEvents title="wstETH Wrap">
      <LidoWstETHWrapsTable />
    </LidoWstETHWrapEvents>
  );
}
