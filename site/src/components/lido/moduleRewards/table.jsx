import isNil from "lodash.isnil";
import ValueDisplay from "../../displayValue";
import EvmExternalLink from "../evmExternalLink";
import EvmTxHash from "../evmTxHash";
import HelpLabel from "../../tooltip/helpLabel";
import { ColoredInterLink } from "../../styled/link";
import Pagination from "../../pagination";
import {
  StyledPanelTableWrapper,
  StyledPanelTableWrapperNoBordered,
} from "../../styled/panel";
import Table from "../../table";
import { useQueryParams } from "../../../hooks/useQueryParams";
import {
  getEtherscanBlockUrl,
  toLidoAmount,
  toLidoBlockNumber,
  toLidoTimestamp,
} from "../../../utils/viewFuncs/lido";

function getLidoModuleRewardsHead(showModuleId) {
  return [
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
    showModuleId && { name: "Module", width: 180 },
    {
      name: (
        <HelpLabel tip="Reward amount in shares." align="right" fullWidth>
          Shares
        </HelpLabel>
      ),
      align: "right",
      width: 180,
    },
  ].filter(Boolean);
}

function toSharesValue(value) {
  if (isNil(value)) {
    return "--";
  }

  return (
    <ValueDisplay
      value={toLidoAmount(value, 18)}
      symbol=""
      showNotEqualTooltip
    />
  );
}

function toLidoModuleRewardsTableData(items = [], showModuleId) {
  return items.map((item) => {
    const indexer = item.indexer || {};
    const rowKey = [indexer.txHash, indexer.logIndex].filter(Boolean).join("-");

    return [
      <EvmExternalLink
        href={getEtherscanBlockUrl(indexer.blockNumber)}
        key={`${rowKey}-block`}
        copy={false}
      >
        {toLidoBlockNumber(indexer.blockNumber)}
      </EvmExternalLink>,
      toLidoTimestamp(indexer.blockTimestamp),
      <EvmTxHash key={`${rowKey}-tx`} txHash={indexer.txHash} copy={false} />,
      showModuleId && item.stakingModuleId && (
        <ColoredInterLink
          key={`${rowKey}-module`}
          to={`/staking/modules/${item.stakingModuleId}`}
        >
          {item.stakingModuleId}
        </ColoredInterLink>
      ),
      showModuleId && !item.stakingModuleId && "--",
      <span key={`${rowKey}-shares`}>{toSharesValue(item.sharesValue)}</span>,
    ].filter(Boolean);
  });
}

export default function LidoModuleRewardsTable({
  data,
  loading,
  showModuleId = true,
  bordered = true,
}) {
  const tableData = toLidoModuleRewardsTableData(data?.items, showModuleId);
  const { page = 1 } = useQueryParams();
  const Wrapper = bordered
    ? StyledPanelTableWrapper
    : StyledPanelTableWrapperNoBordered;

  return (
    <Wrapper
      footer={
        <Pagination
          page={parseInt(page)}
          pageSize={data?.limit}
          total={data?.total}
        />
      }
    >
      <Table
        heads={getLidoModuleRewardsHead(showModuleId)}
        data={tableData}
        loading={loading}
      />
    </Wrapper>
  );
}
