import AddressOrIdentity from "../../components/address";
import BreadCrumb from "../../components/breadCrumb";
import ValueDisplay from "../../components/displayValue";
import Filter from "../../components/filter";
import Layout from "../../components/layout";
import LidoEtherscanLink from "../../components/lido/etherscanLink";
import Pagination from "../../components/pagination";
import { StyledPanelTableWrapper } from "../../components/styled/panel";
import Table from "../../components/table";
import Tooltip from "../../components/tooltip";
import { useLidoDepositsFilter } from "../../hooks/filter/useLidoDepositsFilter";
import { useLidoDepositsData } from "../../hooks/lido";
import useChainSettings from "../../utils/hooks/chain/useChainSettings";
import {
  getEtherscanBlockUrl,
  getEtherscanTxUrl,
  toLidoAmount,
  toLidoBlockNumber,
  toLidoTimestamp,
} from "../../utils/viewFuncs/lido";
import { hashEllipsis } from "../../utils/viewFuncs/text";

const lidoDepositsHead = [
  {
    name: "Block",
    type: "sortable",
    sortDefaultQueryValue: "blockNumber_desc",
    sortAscendingQueryValue: "blockNumber_asc",
    sortDescendingQueryValue: "blockNumber_desc",
    width: 160,
  },
  {
    name: "Time",
    type: "time",
    width: 180,
  },
  { name: "Tx Hash", width: 220 },
  { name: "Address", width: 220 },
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
    <LidoEtherscanLink
      href={getEtherscanBlockUrl(item.blockNumber)}
      key={`${item.id}-block`}
    >
      {toLidoBlockNumber(item.blockNumber)}
    </LidoEtherscanLink>,
    toLidoTimestamp(item.blockTime),
    <Tooltip tip={item.txHash} key={`${item.id}-tx`}>
      <LidoEtherscanLink href={getEtherscanTxUrl(item.txHash)}>
        {hashEllipsis(item.txHash)}
      </LidoEtherscanLink>
    </Tooltip>,
    <AddressOrIdentity
      key={`${item.id}-address`}
      address={item.address}
      noLink
    />,
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
        footer={
          <Pagination
            page={data?.page}
            pageSize={data?.pageSize}
            total={data?.total}
          />
        }
      >
        <Table
          heads={lidoDepositsHead}
          data={tableData}
          loading={loading}
        />
      </StyledPanelTableWrapper>
    </Layout>
  );
}
