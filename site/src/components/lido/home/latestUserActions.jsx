import styled from "styled-components";
import ValueDisplay from "../../displayValue";
import AssetSquareIcon from "../../icons/assetSquareIcon";
import TransferSquareIcon from "../../icons/transferSquareIcon";
import EvmAddress from "../evmAddress";
import EvmExternalLink from "../evmExternalLink";
import LatestList from "../../home/sections/latestList";
import {
  GET_LIDO_DEPOSITS,
  GET_LIDO_WITHDRAWAL_REQUESTS,
} from "../../../services/gql/lido";
import { useLidoList } from "../../../hooks/lido/useLidoList";
import {
  Anchor,
  AnchorWrapper,
  Section,
  SectionsWrapper,
  StyledPanel,
  Title,
} from "../../home/sections/styled";
import { Inter_12_500, Inter_14_600 } from "../../../styles/text";
import { currencify } from "../../../utils";
import {
  getEtherscanBlockUrl,
  toLidoAmount,
  toLidoTimestamp,
} from "../../../utils/viewFuncs/lido";
import { timeDuration } from "../../../utils/viewFuncs/time";

const LATEST_ITEMS_COUNT = 5;

const BlockHeight = styled.div`
  margin-bottom: 4px;
  ${Inter_14_600};
  color: ${(p) => p.theme.theme500};
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  min-width: 0;
  color: ${(p) => p.theme.fontTertiary};
  ${Inter_12_500};
`;

const Right = styled.div`
  text-align: right;
`;

const Value = styled.div`
  margin-bottom: 4px;
  ${Inter_14_600};
  color: ${(p) => p.theme.fontPrimary};
`;

const User = styled.div`
  display: flex;
  justify-content: flex-end;
  min-width: 0;
`;

const emptyStateClassName = "lido-latest-user-actions-empty";

const LatestUserActionsPanel = styled(StyledPanel)`
  .${emptyStateClassName} {
    height: 362px;
  }
`;

const LatestPanelHeader = styled.div`
  display: flex;
  align-items: center;
  min-height: 42px;
  margin-bottom: 16px;
`;

const LatestPanelTitle = styled(Title)`
  margin: 0;
`;

function BlockLink({ blockNumber }) {
  if (!blockNumber) {
    return <BlockHeight>--</BlockHeight>;
  }

  return (
    <EvmExternalLink
      href={getEtherscanBlockUrl(blockNumber)}
      copy={false}
      tooltip={false}
    >
      <BlockHeight>{currencify(Number(blockNumber))}</BlockHeight>
    </EvmExternalLink>
  );
}

function Time({ blockTime }) {
  return <Meta>{timeDuration(toLidoTimestamp(blockTime))}</Meta>;
}

function Amount({ value, decimals, symbol }) {
  return (
    <ValueDisplay
      value={toLidoAmount(value, decimals)}
      symbol={symbol}
      showNotEqualTooltip
    />
  );
}

function toDepositItems(items, { decimals, symbol }) {
  return items.map((item) => ({
    icon: <AssetSquareIcon />,
    left: (
      <div>
        <BlockLink blockNumber={item.blockNumber} />
        <Time blockTime={item.blockTime} />
      </div>
    ),
    right: (
      <Right>
        <Value>
          <Amount value={item.value} decimals={decimals} symbol={symbol} />
        </Value>
        <User>
          <EvmAddress address={item.address} copy={false} maxWidth="160px" />
        </User>
      </Right>
    ),
  }));
}

function toWithdrawalItems(items, { decimals, symbol }) {
  return items.map((item) => ({
    icon: <TransferSquareIcon />,
    left: (
      <div>
        <BlockLink blockNumber={item.blockNumber} />
        <Time blockTime={item.blockTime} />
      </div>
    ),
    right: (
      <Right>
        <Value>
          <Amount value={item.value} decimals={decimals} symbol={symbol} />
        </Value>
        <User>
          <EvmAddress address={item.owner} copy={false} maxWidth="160px" />
        </User>
      </Right>
    ),
  }));
}

function LatestPanel({ title, items, loading, noDataText, viewAllPath }) {
  return (
    <Section>
      <LatestPanelHeader>
        <LatestPanelTitle>{title}</LatestPanelTitle>
      </LatestPanelHeader>
      <LatestUserActionsPanel>
        <LatestList
          items={items}
          loading={loading}
          noDataText={noDataText}
          noDataClassName={emptyStateClassName}
        />
        <AnchorWrapper>
          <Anchor disabled={!items?.length || loading} to={viewAllPath}>
            View All
          </Anchor>
        </AnchorWrapper>
      </LatestUserActionsPanel>
    </Section>
  );
}

export default function LidoLatestUserActions({ decimals, symbol }) {
  const { data: depositsData, loading: depositsLoading } = useLidoList({
    query: GET_LIDO_DEPOSITS,
    field: "deposits",
    pageSize: LATEST_ITEMS_COUNT,
    sortQuery: "blockNumber_desc",
  });
  const { data: withdrawalsData, loading: withdrawalsLoading } = useLidoList({
    query: GET_LIDO_WITHDRAWAL_REQUESTS,
    field: "withdrawalRequests",
    pageSize: LATEST_ITEMS_COUNT,
    sortQuery: "blockNumber_desc",
  });

  const deposits = depositsData?.items || [];
  const withdrawals = withdrawalsData?.items || [];

  return (
    <SectionsWrapper>
      <LatestPanel
        title="Latest User Deposits"
        items={toDepositItems(deposits, { decimals, symbol })}
        loading={depositsLoading}
        noDataText="No deposits"
        viewAllPath="/steth/deposits"
      />
      <LatestPanel
        title="Latest User Withdrawals"
        items={toWithdrawalItems(withdrawals, { decimals, symbol })}
        loading={withdrawalsLoading}
        noDataText="No withdrawals"
        viewAllPath="/steth/withdrawals"
      />
    </SectionsWrapper>
  );
}
