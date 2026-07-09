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
  {
    ...lidoTreasuryIncomeBaseHead[0],
    type: "sortable",
    sortDefaultQueryValue: "block_desc",
    sortAscendingQueryValue: "block_asc",
    sortDescendingQueryValue: "block_desc",
  },
  ...lidoTreasuryIncomeBaseHead.slice(1, 3),
  {
    ...lidoTreasuryIncomeBaseHead[3],
    type: "sortable",
    sortAscendingQueryValue: "value_asc",
    sortDescendingQueryValue: "value_desc",
  },
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
    type: "sortable",
    sortAscendingQueryValue: "shares_asc",
    sortDescendingQueryValue: "shares_desc",
    align: "right",
    width: 180,
  },
];

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
    const indexer = item.indexer || {};
    const rowKey = [indexer.txHash, indexer.logIndex].filter(Boolean).join("-");
    const symbol = showShares ? "stETH" : "ETH";
    const baseColumns = [
      <EvmExternalLink
        href={getEtherscanBlockUrl(indexer.blockNumber)}
        key={`${rowKey}-block`}
        copy={false}
      >
        {toLidoBlockNumber(indexer.blockNumber)}
      </EvmExternalLink>,
      toLidoTimestamp(indexer.blockTimestamp),
      <EvmTxHash key={`${rowKey}-tx`} txHash={indexer.txHash} copy={false} />,
    ];
    const valueColumn = (
      <TreasuryIncomeAmount
        key={`${rowKey}-value`}
        value={item.value}
        symbol={symbol}
      />
    );

    if (showEthFeeFields) {
      return [
        ...baseColumns,
        <EvmAddress
          key={`${rowKey}-vault`}
          address={item.vault}
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
          key={`${rowKey}-shares`}
          value={item.shares}
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
