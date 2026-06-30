import ValueDisplay from "../../displayValue";
import EvmAddress from "../evmAddress";
import EvmExternalLink from "../evmExternalLink";
import EvmTxHash from "../evmTxHash";
import Pagination from "../../pagination";
import HelpLabel from "../../tooltip/helpLabel";
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
import { useQueryParams } from "../../../hooks/useQueryParams";

const TOKEN_DECIMALS = 18;

const lidoTreasuryIncomeBaseHead = [
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

const lidoTreasuryEthIncomeHead = [
  ...lidoTreasuryIncomeBaseHead.slice(0, 3),
  { name: "Vault", width: 220 },
  lidoTreasuryIncomeBaseHead[3],
];

const lidoTreasuryStethIncomeHead = [
  ...lidoTreasuryIncomeBaseHead,
  {
    name: (
      <HelpLabel
        tip="Treasury stETH income amount in shares."
        align="right"
        fullWidth
      >
        Shares
      </HelpLabel>
    ),
    align: "right",
    width: 180,
  },
];

function getTreasuryTransferValue(item) {
  if (item?.stethTransfer) {
    return item.stethTransfer.value;
  }

  return item?.ethTransfer?.value;
}

function getTreasuryTransferValueSymbol(item) {
  if (item?.stethTransfer) {
    return "stETH";
  }

  return "ETH";
}

function TreasuryIncomeAmount({ value, symbol }) {
  return (
    <ValueDisplay
      value={toLidoAmount(value, TOKEN_DECIMALS)}
      symbol={symbol}
      showNotEqualTooltip
    />
  );
}

function toLidoTreasuryIncomeTableData(
  items = [],
  { showEthFeeFields = false, showShares = false } = {},
) {
  return items.map((item) => {
    const baseColumns = [
      <EvmExternalLink
        href={getEtherscanBlockUrl(item.blockNumber)}
        key={`${item.id}-block`}
        copy={false}
      >
        {toLidoBlockNumber(item.blockNumber)}
      </EvmExternalLink>,
      toLidoTimestamp(item.blockTime),
      <EvmTxHash key={`${item.id}-tx`} txHash={item.txHash} copy={false} />,
    ];
    const valueColumn = (
      <TreasuryIncomeAmount
        key={`${item.id}-value`}
        value={getTreasuryTransferValue(item)}
        symbol={getTreasuryTransferValueSymbol(item)}
      />
    );

    if (showEthFeeFields) {
      return [
        ...baseColumns,
        <EvmAddress
          key={`${item.id}-vault`}
          address={item?.ethTransfer?.vault}
          copy={false}
          maxWidth="150px"
        />,
        valueColumn,
      ];
    }

    const columns = [...baseColumns, valueColumn];

    if (showShares) {
      columns.push(
        <TreasuryIncomeAmount
          key={`${item.id}-shares`}
          value={item?.stethTransfer?.shares}
          symbol="shares"
        />,
      );
    }

    return columns;
  });
}

export default function LidoTreasuryIncomeTable({
  data,
  loading,
  bordered = true,
  showEthFeeFields = false,
  showShares = false,
}) {
  const Wrapper = bordered
    ? StyledPanelTableWrapper
    : StyledPanelTableWrapperNoBordered;
  const { page = 1 } = useQueryParams();
  const tableData = toLidoTreasuryIncomeTableData(data?.items, {
    showEthFeeFields,
    showShares,
  });
  const heads = showEthFeeFields
    ? lidoTreasuryEthIncomeHead
    : showShares
    ? lidoTreasuryStethIncomeHead
    : lidoTreasuryIncomeBaseHead;

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
      <Table heads={heads} data={tableData} loading={loading} />
    </Wrapper>
  );
}
