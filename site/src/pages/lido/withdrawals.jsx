import BreadCrumb from "../../components/breadCrumb";
import ValueDisplay from "../../components/displayValue";
import ExternalLink from "../../components/externalLink";
import Filter from "../../components/filter";
import Layout from "../../components/layout";
import LidoStatus from "../../components/lido/status";
import Pagination from "../../components/pagination";
import { StyledPanelTableWrapper } from "../../components/styled/panel";
import { ColoredInterLink } from "../../components/styled/link";
import Table from "../../components/table";
import Tooltip from "../../components/tooltip";
import { useLidoWithdrawalsFilter } from "../../hooks/filter/useLidoWithdrawalsFilter";
import { useLidoWithdrawalsData } from "../../hooks/lido";
import useChainSettings from "../../utils/hooks/chain/useChainSettings";
import {
  getEtherscanBlockUrl,
  getEtherscanTxUrl,
  toLidoAmount,
  toLidoBlockNumber,
  toLidoTimestamp,
} from "../../utils/viewFuncs/lido";
import { hashEllipsis } from "../../utils/viewFuncs/text";

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
    width: 180,
  },
  { name: "Tx Hash", width: 220 },
  { name: "Status", width: 120 },
  {
    name: "Value",
    align: "right",
    width: 180,
  },
  {
    name: "Shares",
    align: "right",
    width: 180,
  },
];

function toLidoWithdrawalsTableData(items = [], chainSettings) {
  const { decimals, symbol } = chainSettings;

  return items.map((item) => {
    return [
      <ColoredInterLink
        key={`${item.id}-request-id`}
        to={`/withdrawals/${item.id}`}
      >
        {item.id}
      </ColoredInterLink>,
      item.blockNumber ? (
        <ExternalLink
          href={getEtherscanBlockUrl(item.blockNumber)}
          key={`${item.id}-block`}
        >
          {toLidoBlockNumber(item.blockNumber)}
        </ExternalLink>
      ) : (
        "--"
      ),
      toLidoTimestamp(item.blockTime),
      item.txHash ? (
        <Tooltip tip={item.txHash} key={`${item.id}-tx`}>
          <ExternalLink href={getEtherscanTxUrl(item.txHash)}>
            {hashEllipsis(item.txHash)}
          </ExternalLink>
        </Tooltip>
      ) : (
        "--"
      ),
      <ValueDisplay
        key={`${item.id}-value`}
        value={toLidoAmount(item.value, decimals)}
        symbol={symbol}
        showNotEqualTooltip
      />,
      <ValueDisplay
        key={`${item.id}-shares`}
        value={toLidoAmount(item.shares, decimals)}
        symbol=""
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
        footer={
          <Pagination
            page={data?.page}
            pageSize={data?.pageSize}
            total={data?.total}
          />
        }
      >
        <Table heads={lidoWithdrawalsHead} data={tableData} loading={loading} />
      </StyledPanelTableWrapper>
    </Layout>
  );
}
