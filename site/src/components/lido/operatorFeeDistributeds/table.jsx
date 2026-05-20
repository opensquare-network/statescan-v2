import isNil from "lodash.isnil";
import ValueDisplay from "../../displayValue";
import EvmExternalLink from "../evmExternalLink";
import EvmPagination from "../evmPagination";
import EvmTxHash from "../evmTxHash";
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

const operatorFeeDistributedsHead = [
  {
    name: "Block",
    width: 160,
  },
  { name: "Time", type: "time", width: 180 },
  { name: "Tx Hash", width: 220 },
  { name: "Shares", align: "right", width: 180 },
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

function toOperatorFeeDistributedsTableData(items = []) {
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
    toSharesValue(item.shares),
  ]);
}

export default function LidoOperatorFeeDistributedsTable({
  data,
  loading,
  bordered = true,
}) {
  const tableData = toOperatorFeeDistributedsTableData(data?.items);
  const Wrapper = bordered
    ? StyledPanelTableWrapper
    : StyledPanelTableWrapperNoBordered;

  return (
    <Wrapper footer={<EvmPagination nextCursor={data?.nextCursor} />}>
      <Table
        heads={operatorFeeDistributedsHead}
        data={tableData}
        loading={loading}
      />
    </Wrapper>
  );
}
