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
import { useLidoDepositsData } from "../../hooks/lido/useLidoDepositsData";
import { useQueryParams } from "../../hooks/useQueryParams";
import useChainSettings from "../../utils/hooks/chain/useChainSettings";
import {
  getEtherscanBlockUrl,
  toLidoAmount,
  toLidoBlockNumber,
  toLidoTimestamp,
} from "../../utils/viewFuncs/lido";

const lidoDepositsHead = [
  {
    name: "Block",
    type: "sortable",
    sortDefaultQueryValue: "block_desc",
    sortAscendingQueryValue: "block_asc",
    sortDescendingQueryValue: "block_desc",
    width: 160,
  },
  { name: "Depositor", width: 220 },
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

function useLidoDepositsTableData(items = []) {
  const { decimals, symbol } = useChainSettings();

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
        value={toLidoAmount(item.value, decimals)}
        symbol={symbol}
        showNotEqualTooltip
      />,
    ];
  });
}

function LidoDepositsTableView({ data, loading }) {
  const { page = 1 } = useQueryParams();
  const tableData = useLidoDepositsTableData(data?.items);

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
      <Table heads={lidoDepositsHead} data={tableData} loading={loading} />
    </StyledPanelTableWrapper>
  );
}

export function LidoDepositsTable({ filters }) {
  const { data, loading } = useLidoDepositsData({ filters });

  return <LidoDepositsTableView data={data} loading={loading} />;
}

export default function LidoDeposits() {
  const filter = useLidoDepositsFilter();

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Deposits" }]} />

      <Filter data={filter} />

      <LidoDepositsTable />
    </Layout>
  );
}
