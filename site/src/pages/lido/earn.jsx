import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Advanced from "../../components/advanced";
import TabBar from "../../components/accountIdentity/tabBar";
import BreadCrumb from "../../components/breadCrumb";
import DetailTabs from "../../components/detail/tabs";
import DetailLayout from "../../components/layout/detailLayout";
import List from "../../components/list";
import EvmAddress from "../../components/lido/evmAddress";
import LidoEarnStatus from "../../components/lido/earn/status";
import {
  EARN_SHARES_DECIMALS,
  LIDO_EARN_CONFIGS,
} from "../../components/lido/earn/common";
import EvmExternalLink from "../../components/lido/evmExternalLink";
import EvmTxHash from "../../components/lido/evmTxHash";
import LoadableContent from "../../components/loadings/loadableContent";
import Pagination from "../../components/pagination";
import {
  EarnTableAssetValue,
  EarnTableSharesValue,
  EarnTableValue,
} from "../../components/lido/earn/value";
import { ColoredInterLink } from "../../components/styled/link";
import {
  Panel,
  StyledPanelTableWrapper,
  StyledPanelTableWrapperNoBordered,
} from "../../components/styled/panel";
import { InlineValueSlot } from "../../components/styled/valueSlot";
import { TextSecondary } from "../../components/styled/text";
import { Tag, TagThemed } from "../../components/tag";
import Table from "../../components/table";
import { GET_LIDO_EARN_TOTALS } from "../../services/gql/lido";
import { useLidoEarnAssets } from "../../context/lidoEarn";
import {
  useLidoEarnSubvaultsData,
  useLidoEarnVaultDepositsData,
  useLidoEarnVaultQueuesData,
  useLidoEarnVaultRedeemsData,
} from "../../hooks/lido/useLidoEarnData";
import { useLidoEarnVaultStatsData } from "../../hooks/lido/useLidoEarnVaultStatsData";
import { useLidoServerQuery } from "../../hooks/lido/useLidoQuery";
import { useQueryParams } from "../../hooks/useQueryParams";
import {
  getEtherscanAddressUrl,
  getEtherscanBlockUrl,
  toLidoBlockNumber,
  toLidoTimestamp,
} from "../../utils/viewFuncs/lido";
import { hashEllipsis } from "../../utils/viewFuncs/text";

const queueHead = [
  { name: "Time", type: "time", width: 220 },
  { name: "Tx Hash", width: 220 },
  { name: "Asset", width: 140 },
  { name: "Mode", width: 160 },
  { name: "Status", align: "right", width: 120 },
];

const redeemQueueHead = [
  { name: "Time", type: "time", width: 220 },
  { name: "Tx Hash", width: 220 },
  { name: "Asset", width: 140 },
  { name: "Status", align: "right", width: 120 },
];

const subvaultHead = [
  { name: "Block", width: 180 },
  { name: "Time", type: "time", width: 220 },
  { name: "Tx Hash", width: 220 },
  { name: "Subvault", width: 220 },
  { name: "Version", width: 120 },
  { name: "Status", align: "right", width: 180 },
];

const activityHead = [
  { name: "Address", width: 200 },
  { name: "Asset", width: 140 },
  { name: "Amount", width: 200 },
  { name: "Shares", width: 140 },
  { name: "Status", align: "right", width: 160 },
];

const depositsHead = [
  { name: "ID", width: 180 },
  {
    name: { time: "Request Time", age: "Request Age" },
    type: "time",
    width: 240,
  },
  ...activityHead,
];

const redeemsHead = [
  { name: "ID", width: 180 },
  {
    name: { time: "Request Time", age: "Request Age" },
    type: "time",
    width: 240,
  },
  ...activityHead,
];

const TabPanel = styled.div`
  margin-top: 0;
`;

const ValueWrapper = styled(TextSecondary)`
  display: inline-flex;
  align-items: center;
`;

const QUEUE_TABS = {
  deposit: "deposit",
  redeem: "redeem",
};

const EARN_MARKETS = {
  eth: "ETH",
  usd: "USD",
};

const queueTabs = [{ name: QUEUE_TABS.deposit }, { name: QUEUE_TABS.redeem }];

function LoadableSharesValue({ loading, value }) {
  return (
    <ValueWrapper>
      <LoadableContent loading={loading}>
        <EarnTableSharesValue value={value} />
      </LoadableContent>
    </ValueWrapper>
  );
}

function useSummaryItems(type) {
  const {
    data,
    loading,
    vaultAddress,
    shareManagerAddress,
    riskManagerAddress,
  } = useLidoEarnVaultStatsData(type);

  return {
    summaryItems: [
      {
        label: "Total Supply",
        value: (
          <LoadableSharesValue loading={loading} value={data.totalSupply} />
        ),
      },
      {
        label: "Total Shares",
        value: (
          <LoadableSharesValue loading={loading} value={data.totalShares} />
        ),
      },
      {
        label: "Pending Balance",
        value: (
          <LoadableSharesValue loading={loading} value={data.pendingBalance} />
        ),
      },
    ],
    advancedItems: [
      {
        label: "Vault",
        value: (
          <InlineValueSlot>
            <LoadableContent loading={loading}>
              <EvmAddress address={vaultAddress} />
            </LoadableContent>
          </InlineValueSlot>
        ),
      },
      {
        label: "Share Manager",
        value: (
          <InlineValueSlot>
            <LoadableContent loading={loading}>
              <EvmAddress address={shareManagerAddress} />
            </LoadableContent>
          </InlineValueSlot>
        ),
      },
      {
        label: "Risk Manager",
        value: (
          <InlineValueSlot>
            <LoadableContent loading={loading}>
              <EvmAddress address={riskManagerAddress} />
            </LoadableContent>
          </InlineValueSlot>
        ),
      },
    ],
  };
}

function EarnSummary({ type }) {
  const { summaryItems, advancedItems } = useSummaryItems(type);

  return (
    <Panel>
      <List data={summaryItems} />
      <Advanced>
        <List data={advancedItems} compact />
      </Advanced>
    </Panel>
  );
}

function toBlockLink(blockNumber) {
  if (!blockNumber) {
    return "--";
  }

  return (
    <EvmExternalLink href={getEtherscanBlockUrl(blockNumber)} copy={false}>
      {toLidoBlockNumber(blockNumber)}
    </EvmExternalLink>
  );
}

function AssetSymbolLink({ asset }) {
  const { getAssetSymbol, loading } = useLidoEarnAssets();
  const symbol = getAssetSymbol(asset);

  if (loading && !symbol) {
    return <LoadableContent loading />;
  }

  if (!symbol) {
    return "--";
  }

  return (
    <EvmExternalLink href={getEtherscanAddressUrl(asset)} copy={false}>
      {symbol}
    </EvmExternalLink>
  );
}

function QueueTypeTag({ queueType }) {
  if (!queueType) {
    return "--";
  }

  if (queueType === "SYNC_DEPOSIT") {
    return <Tag>SYNC</Tag>;
  }

  if (queueType === "ASYNC_DEPOSIT") {
    return <TagThemed>ASYNC</TagThemed>;
  }

  return <TagThemed>{queueType}</TagThemed>;
}

function toEarnQueueTableData(items = [], isDepositQueue) {
  return items.map((item) => {
    const rowKey = [item.indexer?.txHash, item.indexer?.logIndex]
      .filter(Boolean)
      .join("-");
    const baseColumns = [
      toLidoTimestamp(item.indexer?.blockTimestamp),
      <EvmTxHash
        key={`${rowKey || item.queue}-tx`}
        txHash={item.indexer?.txHash}
        copy={false}
      />,
      <AssetSymbolLink asset={item.asset} />,
    ];

    if (!isDepositQueue) {
      return [
        ...baseColumns,
        <LidoEarnStatus status={item.paused ? "Paused" : "Active"} />,
      ];
    }

    return [
      ...baseColumns,
      <QueueTypeTag queueType={item.queueType} />,
      <LidoEarnStatus status={item.paused ? "Paused" : "Active"} />,
    ];
  });
}

function toEarnSubvaultTableData(items = []) {
  return items.map((item) => [
    toBlockLink(item.indexer?.blockNumber),
    toLidoTimestamp(item.indexer?.blockTimestamp),
    <EvmTxHash
      key={`${item.indexer?.txHash || item.subvault}-tx`}
      txHash={item.indexer?.txHash}
      copy={false}
    />,
    <EvmAddress address={item.subvault} copy={false} maxWidth="150px" />,
    item.version ?? "--",
    <LidoEarnStatus status={item.connected ? "Connected" : "Disconnected"} />,
  ]);
}

function toEarnDepositsTableData(items = []) {
  return items.map((item) => [
    <ColoredInterLink key={`${item.id}-id`} to={`/earn/deposits/${item.id}`}>
      {hashEllipsis(item.id)}
    </ColoredInterLink>,
    toLidoTimestamp(item.requestTime),
    <EvmAddress address={item.account} copy={false} maxWidth="150px" />,
    <AssetSymbolLink asset={item.asset} />,
    <EarnTableAssetValue value={item.assets} asset={item.asset} />,
    <EarnTableSharesValue value={item.shares} />,
    <LidoEarnStatus status={item.status} />,
  ]);
}

function toEarnRedeemsTableData(items = []) {
  return items.map((item) => {
    const { claimed } = item;

    return [
      <ColoredInterLink key={`${item.id}-id`} to={`/earn/redeems/${item.id}`}>
        {hashEllipsis(item.id)}
      </ColoredInterLink>,
      toLidoTimestamp(item.requestTime),
      <EvmAddress address={item.account} copy={false} maxWidth="150px" />,
      <AssetSymbolLink asset={item.asset} />,
      <EarnTableValue
        value={item.assets ?? claimed?.assets}
        decimals={EARN_SHARES_DECIMALS}
        symbol="wstETH"
      />,
      <EarnTableSharesValue value={item.shares} />,
      <LidoEarnStatus status={item.status} />,
    ];
  });
}

function EarnTable({ heads, data, loading, pagination, bordered = true }) {
  const Wrapper = bordered
    ? StyledPanelTableWrapper
    : StyledPanelTableWrapperNoBordered;
  const { page = 1 } = useQueryParams();
  const content = (
    <Wrapper
      footer={
        <Pagination
          page={parseInt(page)}
          pageSize={pagination?.limit}
          total={pagination?.total}
        />
      }
    >
      <Table heads={heads} data={data} loading={loading} />
    </Wrapper>
  );

  if (!bordered) {
    return content;
  }

  return <TabPanel>{content}</TabPanel>;
}

function EarnQueueTable({ type, isDepositQueue, bordered = true }) {
  const { data, loading } = useLidoEarnVaultQueuesData(type, isDepositQueue);

  return (
    <EarnTable
      heads={isDepositQueue ? queueHead : redeemQueueHead}
      data={toEarnQueueTableData(data?.items, isDepositQueue)}
      loading={loading}
      pagination={data}
      bordered={bordered}
    />
  );
}

function EarnQueueTabs({ type }) {
  const { sub } = useQueryParams({ parseNumbers: false });
  const location = useLocation();
  const navigate = useNavigate();
  const selectedTab = sub || QUEUE_TABS.deposit;
  const setSelectedTab = useCallback(
    (tab) => {
      const searchParams = new URLSearchParams(location.search);
      searchParams.set("sub", tab);
      searchParams.set("page", "1");
      navigate({
        pathname: location.pathname,
        search: searchParams.toString(),
      });
    },
    [location, navigate],
  );

  return (
    <TabPanel>
      <Panel>
        <TabBar
          tabs={queueTabs}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />

        {selectedTab === QUEUE_TABS.deposit && (
          <EarnQueueTable type={type} isDepositQueue bordered={false} />
        )}

        {selectedTab === QUEUE_TABS.redeem && (
          <EarnQueueTable type={type} isDepositQueue={false} bordered={false} />
        )}
      </Panel>
    </TabPanel>
  );
}

function EarnDepositsTable({ type }) {
  const { data, loading } = useLidoEarnVaultDepositsData(type);

  return (
    <EarnTable
      heads={depositsHead}
      data={toEarnDepositsTableData(data?.items)}
      loading={loading}
      pagination={data}
    />
  );
}

function EarnSubvaultTable({ type }) {
  const { data, loading } = useLidoEarnSubvaultsData(type);

  return (
    <EarnTable
      heads={subvaultHead}
      data={toEarnSubvaultTableData(data?.items)}
      loading={loading}
      pagination={data}
    />
  );
}

function EarnRedeemsTable({ type }) {
  const { data, loading } = useLidoEarnVaultRedeemsData(type);

  return (
    <EarnTable
      heads={redeemsHead}
      data={toEarnRedeemsTableData(data?.items)}
      loading={loading}
      pagination={data}
    />
  );
}

function EarnTabs({ type }) {
  const market = EARN_MARKETS[type];
  const { data: totals } = useLidoServerQuery(GET_LIDO_EARN_TOTALS, {
    variables: {
      market,
    },
    skip: !market,
  });
  const tabs = [
    {
      name: "Queue",
      value: "queue",
      children: <EarnQueueTabs type={type} />,
    },
    {
      name: "Subvault",
      value: "subvault",
      count: totals?.earnSubvaults?.total,
      children: <EarnSubvaultTable type={type} />,
    },
    {
      name: "Deposits",
      value: "deposits",
      count: totals?.earnDeposits?.total,
      children: <EarnDepositsTable type={type} />,
    },
    {
      name: "Redeems",
      value: "redeems",
      count: totals?.earnRedeems?.total,
      children: <EarnRedeemsTable type={type} />,
    },
  ];

  return <DetailTabs tabs={tabs} resetPage={false} />;
}

export default function LidoEarn({ type = "eth" }) {
  const config = LIDO_EARN_CONFIGS[type];
  const breadCrumb = <BreadCrumb data={[{ name: config?.title }]} />;

  return (
    <DetailLayout breadCrumb={breadCrumb}>
      <EarnSummary type={type} />

      <EarnTabs type={type} />
    </DetailLayout>
  );
}

export function LidoEarnETH() {
  return <LidoEarn type="eth" />;
}

export function LidoEarnUSD() {
  return <LidoEarn type="usd" />;
}
