import isNil from "lodash.isnil";
import ValueDisplay from "../../displayValue";
import EvmAddress from "../evmAddress";
import EvmExternalLink from "../evmExternalLink";
import EvmTxHash from "../evmTxHash";
import Pagination from "../../pagination";
import {
  StyledPanelTableWrapper,
  StyledPanelTableWrapperNoBordered,
} from "../../styled/panel";
import Table from "../../table";
import { useLidoOperatorRewardClaimsData } from "../../../hooks/lido/useLidoOperatorRewardClaimsData";
import { useQueryParams } from "../../../hooks/useQueryParams";
import {
  getEtherscanBlockUrl,
  toLidoAmount,
  toLidoBlockNumber,
  toLidoTimestamp,
} from "../../../utils/viewFuncs/lido";

const operatorRewardClaimsHead = [
  {
    name: "Block",
    type: "sortable",
    sortDefaultQueryValue: "block_desc",
    sortAscendingQueryValue: "block_asc",
    sortDescendingQueryValue: "block_desc",
    width: 160,
  },
  { name: "Time", type: "time", width: 200 },
  { name: "Tx Hash", width: 220 },
  { name: "Request ID", width: 140 },
  { name: "Claim Address", width: 220 },
  { name: "Type", width: 120 },
  {
    name: "Amount",
    type: "sortable",
    sortAscendingQueryValue: "amount_asc",
    sortDescendingQueryValue: "amount_desc",
    align: "right",
    width: 180,
  },
];

function toAmountValue(value) {
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

function toOperatorRewardClaimsTableData(items = []) {
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
      item.requestId,
      <EvmAddress
        key={`${rowKey}-claim-address`}
        address={item.to}
        copy={false}
        maxWidth="170px"
      />,
      item.type,
      toAmountValue(item.amount),
    ];
  });
}

export default function LidoNodeOperatorRewardClaims({
  nodeOperatorId,
  bordered = true,
}) {
  const { data, loading } = useLidoOperatorRewardClaimsData(nodeOperatorId);
  const tableData = toOperatorRewardClaimsTableData(data?.items);
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
        heads={operatorRewardClaimsHead}
        data={tableData}
        loading={loading}
      />
    </Wrapper>
  );
}
