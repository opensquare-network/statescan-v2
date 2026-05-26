import isNil from "lodash.isnil";
import ValueDisplay from "../../displayValue";
import EvmAddress from "../evmAddress";
import EvmExternalLink from "../evmExternalLink";
import EvmPagination from "../evmPagination";
import EvmTxHash from "../evmTxHash";
import { StyledPanelTableWrapper } from "../../styled/panel";
import Table from "../../table";
import HelpLabel from "../../tooltip/helpLabel";
import { useLidoRewardsDistributedsData } from "../../../hooks/lido/useLidoRewardsDistributedsData";
import {
  getEtherscanBlockUrl,
  toLidoAmount,
  toLidoBlockNumber,
  toLidoTimestamp,
} from "../../../utils/viewFuncs/lido";

const rewardsDistributedHead = [
  {
    name: "Block",
    type: "sortable",
    sortDefaultQueryValue: "blockNumber_desc",
    sortAscendingQueryValue: "blockNumber_asc",
    sortDescendingQueryValue: "blockNumber_desc",
    width: 160,
  },
  { name: "Time", type: "time", width: 200 },
  { name: "Tx Hash", width: 220 },
  { name: "Reward Address", width: 220 },
  {
    name: (
      <HelpLabel tip="Reward amount in shares." align="right" fullWidth>
        Shares
      </HelpLabel>
    ),
    align: "right",
    width: 180,
  },
];

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

function toRewardsDistributedTableData(items = []) {
  return items.map((item) => [
    <EvmExternalLink
      href={getEtherscanBlockUrl(item.blockNumber)}
      key={`${item.id}-block`}
      copy={false}
    >
      {toLidoBlockNumber(item.blockNumber)}
    </EvmExternalLink>,
    toLidoTimestamp(item.blockTime),
    <EvmTxHash key={`${item.id}-tx`} txHash={item.txHash} copy={false} />,
    <EvmAddress
      key={`${item.id}-reward-address`}
      address={item.rewardAddress}
      copy={false}
      maxWidth="170px"
    />,
    toSharesValue(item.sharesAmount),
  ]);
}

export default function LidoNodeOperatorRewardsDistributed({
  stakingModuleId,
  nodeOperatorId,
}) {
  const { data, loading } = useLidoRewardsDistributedsData(
    stakingModuleId,
    nodeOperatorId,
  );
  const tableData = toRewardsDistributedTableData(data?.items);

  return (
    <StyledPanelTableWrapper
      footer={<EvmPagination nextCursor={data?.nextCursor} />}
    >
      <Table
        heads={rewardsDistributedHead}
        data={tableData}
        loading={loading}
      />
    </StyledPanelTableWrapper>
  );
}
