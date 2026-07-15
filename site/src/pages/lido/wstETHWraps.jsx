import BreadCrumb from "../../components/breadCrumb";
import ValueDisplay from "../../components/displayValue";
import Filter from "../../components/filter";
import Layout from "../../components/layout";
import EvmAddress from "../../components/lido/evmAddress";
import EvmExternalLink from "../../components/lido/evmExternalLink";
import EvmTxHash from "../../components/lido/evmTxHash";
import Pagination from "../../components/pagination";
import { StyledPanelTableWrapper } from "../../components/styled/panel";
import Table from "../../components/table";
import { useLidoDepositsFilter } from "../../hooks/filter/useLidoDepositsFilter";
import {
  useLidoWstETHUnwrapsData,
  useLidoWstETHWrapsData,
} from "../../hooks/lido/useLidoWstETHWrapsData";
import { useQueryParams } from "../../hooks/useQueryParams";
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
    sortDefaultQueryValue: "block_desc",
    sortAscendingQueryValue: "block_asc",
    sortDescendingQueryValue: "block_desc",
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
    name: "wstETH",
    type: "sortable",
    sortAscendingQueryValue: "value_asc",
    sortDescendingQueryValue: "value_desc",
    align: "right",
    width: 180,
  },
  {
    name: "stETH",
    align: "right",
    width: 180,
  },
];

function toLidoWstETHWrapsTableData(items = []) {
  return items.map((item) => {
    const rowKey = [item.indexer?.txHash, item.indexer?.logIndex]
      .filter(Boolean)
      .join("-");

    return [
      <EvmExternalLink
        href={getEtherscanBlockUrl(item.indexer?.blockNumber)}
        key={`${rowKey}-block`}
        copy={false}
      >
        {toLidoBlockNumber(item.indexer?.blockNumber)}
      </EvmExternalLink>,
      <EvmAddress
        key={`${rowKey}-address`}
        address={item.address}
        copy={false}
      />,
      toLidoTimestamp(item.indexer?.blockTimestamp),
      <EvmTxHash
        key={`${rowKey}-tx`}
        txHash={item.indexer?.txHash}
        copy={false}
      />,
      <ValueDisplay
        key={`${rowKey}-value`}
        value={toLidoAmount(item.value, 18)}
        symbol="wstETH"
        showNotEqualTooltip
      />,
      <ValueDisplay
        key={`${rowKey}-steth-value`}
        value={toLidoAmount(item.stETHValue, 18)}
        symbol="stETH"
        showNotEqualTooltip
      />,
    ];
  });
}

function LidoWstETHWrapEventsTableView({ data, loading }) {
  const { page = 1 } = useQueryParams();
  const tableData = toLidoWstETHWrapsTableData(data?.items);

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
