import isNil from "lodash.isnil";
import ValueDisplay from "../../displayValue";
import EvmAddress from "../evmAddress";
import EvmExternalLink from "../evmExternalLink";
import EvmPagination from "../evmPagination";
import EvmTxHash from "../evmTxHash";
import {
  StyledPanelTableWrapper,
  StyledPanelTableWrapperNoBordered,
} from "../../styled/panel";
import Table from "../../table";
import HelpLabel from "../../tooltip/helpLabel";
import { useLidoOperatorRewardClaimsData } from "../../../hooks/lido/useLidoOperatorRewardClaimsData";
import {
  getEtherscanBlockUrl,
  toLidoAmount,
  toLidoBlockNumber,
  toLidoTimestamp,
} from "../../../utils/viewFuncs/lido";

const operatorRewardClaimsHead = [
  {
    name: "Block",
    width: 160,
  },
  { name: "Time", type: "time", width: 200 },
  { name: "Tx Hash", width: 220 },
  { name: "Request ID", width: 140 },
  { name: "Claim Address", width: 220 },
  { name: "Type", width: 120 },
  { name: "Requested Amount", align: "right", width: 180 },
  {
    name: (
      <HelpLabel tip="Reward amount in shares." align="right" fullWidth>
        Claimed Shares
      </HelpLabel>
    ),
    align: "right",
    width: 180,
  },
  { name: "Claimed wstETH", align: "right", width: 180 },
  {
    name: (
      <HelpLabel tip="Reward amount in shares." align="right" fullWidth>
        Cumulative Fee Shares
      </HelpLabel>
    ),
    align: "right",
    width: 220,
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
    item.requestId,
    <EvmAddress
      key={`${item.id}-claim-address`}
      address={item.claimAddress}
      copy={false}
      maxWidth="170px"
    />,
    item.type,
    toAmountValue(item.requestedAmount),
    toAmountValue(item.claimedShares),
    toAmountValue(item.claimedWstETHAmount),
    toAmountValue(item.cumulativeFeeShares),
  ]);
}

export default function LidoNodeOperatorRewardClaims({
  nodeOperatorId,
  bordered = true,
}) {
  const { data, loading } = useLidoOperatorRewardClaimsData(nodeOperatorId);
  const tableData = toOperatorRewardClaimsTableData(data?.items);
  const Wrapper = bordered
    ? StyledPanelTableWrapper
    : StyledPanelTableWrapperNoBordered;

  return (
    <Wrapper footer={<EvmPagination nextCursor={data?.nextCursor} />}>
      <Table
        heads={operatorRewardClaimsHead}
        data={tableData}
        loading={loading}
      />
    </Wrapper>
  );
}
