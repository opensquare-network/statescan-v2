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
import { useLidoDepositsData } from "../../hooks/lido/useLidoDepositsData";
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

function toLidoDepositsTableData(items = [], { decimals, symbol }) {
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
      value={toLidoAmount(item.value, decimals)}
      symbol={symbol}
      showNotEqualTooltip
    />,
  ]);
}

export default function LidoDeposits() {
  const filter = useLidoDepositsFilter();
  const chainSettings = useChainSettings();
  const { data, loading } = useLidoDepositsData();
  const tableData = toLidoDepositsTableData(data?.items, chainSettings);

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Deposits" }]} />

      <Filter data={filter} />

      <StyledPanelTableWrapper
        footer={<EvmPagination nextCursor={data?.nextCursor} />}
      >
        <Table heads={lidoDepositsHead} data={tableData} loading={loading} />
      </StyledPanelTableWrapper>
    </Layout>
  );
}
