import BreadCrumb from "../../components/breadCrumb";
import LidoWithdrawalsSummary from "../../components/lido/withdrawals/summary";
import ValueDisplay from "../../components/displayValue";
import Filter from "../../components/filter";
import Layout from "../../components/layout";
import EvmAddress from "../../components/lido/evmAddress";
import EvmExternalLink from "../../components/lido/evmExternalLink";
import LidoStatus from "../../components/lido/status";
import EvmTxHash from "../../components/lido/evmTxHash";
import Pagination from "../../components/pagination";
import { StyledPanelTableWrapper } from "../../components/styled/panel";
import { ColoredInterLink } from "../../components/styled/link";
import Table from "../../components/table";
import { useLidoWithdrawalsFilter } from "../../hooks/filter/useLidoWithdrawalsFilter";
import { useLidoWithdrawalsData } from "../../hooks/lido/useLidoWithdrawalsData";
import { useQueryParams } from "../../hooks/useQueryParams";
import useChainSettings from "../../utils/hooks/chain/useChainSettings";
import {
  getEtherscanBlockUrl,
  toLidoAmount,
  toLidoBlockNumber,
  toLidoTimestamp,
} from "../../utils/viewFuncs/lido";

const lidoWithdrawalsHead = [
  { name: "Request ID", width: 140 },
  {
    name: "Block",
    type: "sortable",
    sortDefaultQueryValue: "block_desc",
    sortAscendingQueryValue: "block_asc",
    sortDescendingQueryValue: "block_desc",
    width: 160,
  },
  {
    name: "Time",
    type: "time",
    width: 200,
  },
  { name: "Tx Hash", width: 220 },
  { name: "Owner", width: 200 },
  {
    name: "Value",
    type: "sortable",
    sortAscendingQueryValue: "amount_of_shares_asc",
    sortDescendingQueryValue: "amount_of_shares_desc",
    align: "right",
    width: 180,
  },
  { name: "Status", width: 120 },
];

function useLidoWithdrawalsTableData(items = []) {
  const { decimals, symbol } = useChainSettings();

  return items.map((item) => {
    return [
      <ColoredInterLink
        key={`${item.requestId}-request-id`}
        to={`/steth/withdrawals/${item.requestId}`}
      >
        {item.requestId}
      </ColoredInterLink>,
      item.indexer?.blockNumber ? (
        <EvmExternalLink
          href={getEtherscanBlockUrl(item.indexer.blockNumber)}
          key={`${item.requestId}-block`}
          copy={false}
        >
          {toLidoBlockNumber(item.indexer.blockNumber)}
        </EvmExternalLink>
      ) : (
        "--"
      ),
      toLidoTimestamp(item.indexer?.blockTimestamp),
      <EvmTxHash
        key={`${item.requestId}-tx`}
        txHash={item.indexer?.txHash}
        copy={false}
      />,
      <EvmAddress
        key={`${item.requestId}-owner`}
        address={item.owner}
        copy={false}
        maxWidth="150px"
      />,
      <ValueDisplay
        key={`${item.requestId}-value`}
        value={toLidoAmount(item.amountOfStETH, decimals)}
        symbol={symbol}
        showNotEqualTooltip
      />,
      <LidoStatus key={`${item.requestId}-status`} status={item.status} />,
    ];
  });
}

function LidoWithdrawalsTableView({ data, loading }) {
  const { page = 1 } = useQueryParams();
  const tableData = useLidoWithdrawalsTableData(data?.items);

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
      <Table heads={lidoWithdrawalsHead} data={tableData} loading={loading} />
    </StyledPanelTableWrapper>
  );
}

export function LidoWithdrawalsTable({ filters }) {
  const { data, loading } = useLidoWithdrawalsData({ filters });

  return <LidoWithdrawalsTableView data={data} loading={loading} />;
}

export default function LidoWithdrawals() {
  const filter = useLidoWithdrawalsFilter();
  const { status = "" } = useQueryParams({ parseNumbers: false });

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Withdrawals" }]} />

      <LidoWithdrawalsSummary />

      <Filter data={filter} />

      <LidoWithdrawalsTable filters={{ status }} />
    </Layout>
  );
}
