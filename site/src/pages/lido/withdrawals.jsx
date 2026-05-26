import BreadCrumb from "../../components/breadCrumb";
import ValueDisplay from "../../components/displayValue";
import Filter from "../../components/filter";
import Layout from "../../components/layout";
import EvmAddress from "../../components/lido/evmAddress";
import EvmExternalLink from "../../components/lido/evmExternalLink";
import EvmPagination from "../../components/lido/evmPagination";
import LidoStatus from "../../components/lido/status";
import EvmTxHash from "../../components/lido/evmTxHash";
import { StyledPanelTableWrapper } from "../../components/styled/panel";
import { ColoredInterLink } from "../../components/styled/link";
import Table from "../../components/table";
import { useLidoWithdrawalsFilter } from "../../hooks/filter/useLidoWithdrawalsFilter";
import { useLidoWithdrawalsData } from "../../hooks/lido/useLidoWithdrawalsData";
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
    sortDefaultQueryValue: "blockNumber_desc",
    sortAscendingQueryValue: "blockNumber_asc",
    sortDescendingQueryValue: "blockNumber_desc",
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
    sortAscendingQueryValue: "value_asc",
    sortDescendingQueryValue: "value_desc",
    align: "right",
    width: 180,
  },
  { name: "Status", width: 120 },
];

function toLidoWithdrawalsTableData(items = [], chainSettings) {
  const { decimals, symbol } = chainSettings;

  return items.map((item) => {
    return [
      <ColoredInterLink
        key={`${item.id}-request-id`}
        to={`/steth/withdrawals/${item.id}`}
      >
        {item.id}
      </ColoredInterLink>,
      item.blockNumber ? (
        <EvmExternalLink
          href={getEtherscanBlockUrl(item.blockNumber)}
          key={`${item.id}-block`}
          copy={false}
        >
          {toLidoBlockNumber(item.blockNumber)}
        </EvmExternalLink>
      ) : (
        "--"
      ),
      toLidoTimestamp(item.blockTime),
      <EvmTxHash key={`${item.id}-tx`} txHash={item.txHash} copy={false} />,
      <EvmAddress
        key={`${item.id}-owner`}
        address={item.owner}
        copy={false}
        maxWidth="150px"
      />,
      <ValueDisplay
        key={`${item.id}-value`}
        value={toLidoAmount(item.value, decimals)}
        symbol={symbol}
        showNotEqualTooltip
      />,
      <LidoStatus key={`${item.id}-status`} status={item.status} />,
    ];
  });
}

export default function LidoWithdrawals() {
  const filter = useLidoWithdrawalsFilter();
  const chainSettings = useChainSettings();
  const { data, loading } = useLidoWithdrawalsData();
  const tableData = toLidoWithdrawalsTableData(data?.items, chainSettings);

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Withdrawals" }]} />

      <Filter data={filter} />

      <StyledPanelTableWrapper
        footer={<EvmPagination nextCursor={data?.nextCursor} />}
      >
        <Table heads={lidoWithdrawalsHead} data={tableData} loading={loading} />
      </StyledPanelTableWrapper>
    </Layout>
  );
}
