import isNil from "lodash.isnil";
import ValueDisplay from "../../displayValue";
import EvmAddress from "../evmAddress";
import EvmExternalLink from "../evmExternalLink";
import EvmTxHash from "../evmTxHash";
import Pagination from "../../pagination";
import { StyledPanelTableWrapper } from "../../styled/panel";
import Table from "../../table";
import HelpLabel from "../../tooltip/helpLabel";
import { useLidoRewardsDistributedsData } from "../../../hooks/lido/useLidoRewardsDistributedsData";
import { useQueryParams } from "../../../hooks/useQueryParams";
import {
  getEtherscanBlockUrl,
  toLidoAmount,
  toLidoBlockNumber,
  toLidoTimestamp,
} from "../../../utils/viewFuncs/lido";

const rewardsDistributedHead = [
  {
    name: "Block",
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
      <EvmAddress
        key={`${rowKey}-reward-address`}
        address={item.rewardAddress}
        copy={false}
        maxWidth="170px"
      />,
      toSharesValue(item.sharesAmount),
    ];
  });
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
        heads={rewardsDistributedHead}
        data={tableData}
        loading={loading}
      />
    </StyledPanelTableWrapper>
  );
}
