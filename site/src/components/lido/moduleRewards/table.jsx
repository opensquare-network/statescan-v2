import isNil from "lodash.isnil";
import ValueDisplay from "../../displayValue";
import EvmExternalLink from "../evmExternalLink";
import EvmPagination from "../evmPagination";
import EvmTxHash from "../evmTxHash";
import HelpLabel from "../../tooltip/helpLabel";
import { ColoredInterLink } from "../../styled/link";
import {
  StyledPanelTableWrapper,
  StyledPanelTableWrapperNoBordered,
} from "../../styled/panel";
import Table from "../../table";
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
      showModuleId && item.stakingModuleId && (
        <ColoredInterLink
          key={`${item.id}-module`}
          to={`/staking/modules/${item.stakingModuleId}`}
        >
          {item.stakingModule?.name}
        </ColoredInterLink>
      ),
      showModuleId && !item.stakingModuleId && "--",
      <span key={`${item.id}-shares`}>{toSharesValue(item.sharesValue)}</span>,
    ].filter(Boolean),
  );
}

export default function LidoModuleRewardsTable({
  data,
  loading,
  showModuleId = true,
  bordered = true,
}) {
  const tableData = toLidoModuleRewardsTableData(data?.items, showModuleId);
  const Wrapper = bordered
    ? StyledPanelTableWrapper
    : StyledPanelTableWrapperNoBordered;

  return (
    <Wrapper footer={<EvmPagination nextCursor={data?.nextCursor} />}>
      <Table
        heads={getLidoModuleRewardsHead(showModuleId)}
        data={tableData}
        loading={loading}
      />
    </Wrapper>
  );
}
