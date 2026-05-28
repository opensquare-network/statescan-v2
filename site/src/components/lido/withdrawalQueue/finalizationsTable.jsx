import isNil from "lodash.isnil";
import styled from "styled-components";
import EvmExternalLink from "../evmExternalLink";
import EvmPagination from "../evmPagination";
import EvmTxHash from "../evmTxHash";
import ValueDisplay from "../../displayValue";
import { ColoredInterLink } from "../../styled/link";
import { StyledPanelTableWrapper } from "../../styled/panel";
import Table from "../../table";
import HelpLabel from "../../tooltip/helpLabel";
import {
  getEtherscanBlockUrl,
  toLidoAmount,
  toLidoBlockNumber,
  toLidoTimestamp,
} from "../../../utils/viewFuncs/lido";
import { useLidoWithdrawalQueueFinalizationsData } from "../../../hooks/lido/useLidoWithdrawalQueueData";
import useChainSettings from "../../../utils/hooks/chain/useChainSettings";

const heads = [
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
  { name: "Request Range", width: 240 },
  { name: "Value", align: "right", width: 180 },
  {
    name: (
      <HelpLabel tip="Finalized amount in shares." align="right" fullWidth>
        Shares
      </HelpLabel>
    ),
    align: "right",
    width: 180,
  },
];

const RequestRange = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
`;

const RangeSeparator = styled.span`
  color: ${(p) => p.theme.fontTertiary};
`;

function toRequestLink(requestId) {
  if (!requestId) {
    return "--";
  }

  return (
    <ColoredInterLink to={`/steth/withdrawals/${requestId}`}>
      {requestId}
    </ColoredInterLink>
  );
}

function toRequestRange(fromRequestId, toRequestId) {
  return (
    <RequestRange>
      {toRequestLink(fromRequestId)}
      <RangeSeparator>to</RangeSeparator>
      {toRequestLink(toRequestId)}
    </RequestRange>
  );
}

function toValue(value, { decimals, symbol }, key) {
  if (isNil(value)) {
    return "--";
  }

  return (
    <ValueDisplay
      key={key}
      value={toLidoAmount(value, decimals)}
      symbol={symbol}
      showNotEqualTooltip
    />
  );
}

function toTableData(items = [], chainSettings) {
  const { decimals, symbol } = chainSettings;

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
    toRequestRange(item.fromRequestId, item.toRequestId),
    toValue(item.value, { decimals, symbol }, `${item.id}-value`),
    toValue(item.shares, { decimals, symbol: "" }, `${item.id}-shares`),
  ]);
}

export default function LidoWithdrawalQueueFinalizationsTable() {
  const { data, loading } = useLidoWithdrawalQueueFinalizationsData();
  const chainSettings = useChainSettings();

  return (
    <StyledPanelTableWrapper
      footer={<EvmPagination nextCursor={data?.nextCursor} />}
    >
      <Table
        heads={heads}
        data={toTableData(data?.items, chainSettings)}
        loading={loading}
      />
    </StyledPanelTableWrapper>
  );
}
