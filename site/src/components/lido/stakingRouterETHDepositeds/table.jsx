import ValueDisplay from "../../displayValue";
import EvmExternalLink from "../evmExternalLink";
import EvmTxHash from "../evmTxHash";
import Pagination from "../../pagination";
import { ColoredInterLink } from "../../styled/link";
import { StyledPanelTableWrapper } from "../../styled/panel";
import Table from "../../table";
import {
  getEtherscanBlockUrl,
  toLidoAmount,
  toLidoBlockNumber,
  toLidoTimestamp,
} from "../../../utils/viewFuncs/lido";
import useChainSettings from "../../../utils/hooks/chain/useChainSettings";
import { useQueryParams } from "../../../hooks/useQueryParams";

function getLidoStakingRouterETHDepositedsHead(showModuleId) {
  return [
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
    showModuleId && { name: "Module", width: 180 },
    {
      name: "Amount",
      type: "sortable",
      sortAscendingQueryValue: "amount_asc",
      sortDescendingQueryValue: "amount_desc",
      align: "right",
      width: 180,
    },
  ].filter(Boolean);
}

function useLidoStakingRouterETHDepositedsTableData(items = [], showModuleId) {
  const { decimals, symbol } = useChainSettings();

  return items.map((item) =>
    [
      <EvmExternalLink
        href={getEtherscanBlockUrl(item.blockNumber)}
        key={`${item.id}-block`}
        copy={false}
      >
        {toLidoBlockNumber(item.blockNumber)}
      </EvmExternalLink>,
      toLidoTimestamp(item.blockTime),
      <EvmTxHash key={`${item.id}-tx`} txHash={item.txHash} copy={false} />,
      showModuleId && (
        <ColoredInterLink
          key={`${item.id}-module`}
          to={`/staking/modules/${item.stakingModuleId}`}
        >
          {item.stakingModule?.name || item.stakingModuleId}
        </ColoredInterLink>
      ),
      <ValueDisplay
        key={`${item.id}-amount`}
        value={toLidoAmount(item.amount, decimals)}
        symbol={symbol}
        showNotEqualTooltip
      />,
    ].filter(Boolean),
  );
}

export default function LidoStakingRouterETHDepositedsTable({
  data,
  loading,
  showModuleId = true,
}) {
  const tableData = useLidoStakingRouterETHDepositedsTableData(
    data?.items,
    showModuleId,
  );
  const { page = 1 } = useQueryParams();

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
      <Table
        heads={getLidoStakingRouterETHDepositedsHead(showModuleId)}
        data={tableData}
        loading={loading}
      />
    </StyledPanelTableWrapper>
  );
}
