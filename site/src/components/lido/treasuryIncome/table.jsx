import ValueDisplay from "../../displayValue";
import EvmExternalLink from "../evmExternalLink";
import EvmPagination from "../evmPagination";
import EvmTxHash from "../evmTxHash";
import { StyledPanelTableWrapper } from "../../styled/panel";
import Table from "../../table";
import {
  getEtherscanBlockUrl,
  toLidoAmount,
  toLidoBlockNumber,
  toLidoTimestamp,
} from "../../../utils/viewFuncs/lido";

const TOKEN_DECIMALS = 18;

const lidoTreasuryIncomeHead = [
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
  {
    name: "Value",
    align: "right",
    width: 180,
  },
];

function getTreasuryTransferSymbol(item) {
  if (item?.stethTransfer) {
    return "shares";
  }

  return "ETH";
}

function getTreasuryTransferValue(item) {
  if (item?.stethTransfer) {
    return item.stethTransfer.shares;
  }

  return item?.ethTransfer?.value;
}

function TreasuryIncomeValue({ item }) {
  return (
    <ValueDisplay
      value={toLidoAmount(getTreasuryTransferValue(item), TOKEN_DECIMALS)}
      symbol={getTreasuryTransferSymbol(item)}
      showNotEqualTooltip
    />
  );
}

function toLidoTreasuryIncomeTableData(items = []) {
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
    <TreasuryIncomeValue key={`${item.id}-value`} item={item} />,
  ]);
}

export default function LidoTreasuryIncomeTable({ data, loading }) {
  const tableData = toLidoTreasuryIncomeTableData(data?.items);

  return (
    <StyledPanelTableWrapper
      footer={<EvmPagination nextCursor={data?.nextCursor} />}
    >
      <Table
        heads={lidoTreasuryIncomeHead}
        data={tableData}
        loading={loading}
      />
    </StyledPanelTableWrapper>
  );
}
