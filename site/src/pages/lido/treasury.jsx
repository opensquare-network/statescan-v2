import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BigNumber from "bignumber.js";
import styled from "styled-components";
import BreadCrumb from "../../components/breadCrumb";
import TabBar from "../../components/accountIdentity/tabBar";
import DetailLayout from "../../components/layout/detailLayout";
import DetailTabs from "../../components/detail/tabs";
import Filter from "../../components/filter";
import ExternalLink from "../../components/externalLink";
import Layout from "../../components/layout";
import List from "../../components/list";
import Advanced from "../../components/advanced";
import LoadableContent from "../../components/loadings/loadableContent";
import Tooltip from "../../components/tooltip";
import ValueDisplay from "../../components/displayValue";
import LidoAddressDetailAddress from "../../components/lido/addressDetailAddress";
import LidoTreasuryIncomeTable from "../../components/lido/treasuryIncome/table";
import CaretUprightIcon from "../../components/icons/caretUpright";
import { Panel } from "../../components/styled/panel";
import { TextSecondary } from "../../components/styled/text";
import { useLidoTreasuryTransfersFilter } from "../../hooks/filter/useLidoTreasuryTransfersFilter";
import { useLidoTreasuryAddressData } from "../../hooks/lido/useLidoTreasuryAddressData";
import { useLidoTreasuryTokenBalancesData } from "../../hooks/lido/useLidoTreasuryTokenBalancesData";
import {
  LIDO_TREASURY_INCOME_TYPES,
  useLidoTreasuryTransfersData,
} from "../../hooks/lido/useLidoTreasuryTransfersData";
import { useQueryParams } from "../../hooks/useQueryParams";

const TOP_TREASURY_ASSETS_COUNT = 5;

const treasuryIncomeTabs = [
  { name: LIDO_TREASURY_INCOME_TYPES.eth },
  { name: LIDO_TREASURY_INCOME_TYPES.steth },
];

const ValueWrapper = styled(TextSecondary)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

const DebankLink = styled(ExternalLink)`
  display: inline-flex;
  align-items: center;
  color: ${(p) => p.theme.fontTertiary};
`;

const ExternalLinkIcon = styled(CaretUprightIcon)`
  width: 14px;
  height: 14px;

  path {
    stroke: ${(p) => p.theme.fontTertiary};
    stroke-opacity: 1;
  }
`;

const LabelWithLink = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

function getDefiAssets(protocols = []) {
  return protocols.flatMap((protocol) =>
    (protocol.positions || []).map((position) => ({
      ...position,
      protocol: protocol.protocol,
    })),
  );
}

function getDebankProfileUrl(address) {
  return address ? `https://debank.com/profile/${address}` : null;
}

function DebankIconLink({ address }) {
  const href = getDebankProfileUrl(address);

  if (!href) {
    return null;
  }

  return (
    <Tooltip tip="View on Debank">
      <DebankLink href={href} aria-label="View treasury on Debank">
        <ExternalLinkIcon />
      </DebankLink>
    </Tooltip>
  );
}

function getAssetLabel(asset) {
  return asset.protocol ? `${asset.symbol} (${asset.protocol})` : asset.symbol;
}

function LidoTreasurySummary({ treasuryAddress, treasuryAddressLoading }) {
  const { data: treasuryTokens, loading: tokensLoading } =
    useLidoTreasuryTokenBalancesData();
  const walletAssets = treasuryTokens.walletAssets || [];
  const defiAssets = getDefiAssets(treasuryTokens.defiProtocols);
  const assets = [...walletAssets, ...defiAssets];
  const topAssets = [...walletAssets]
    .sort((a, b) =>
      new BigNumber(b.valueUsd || 0).minus(a.valueUsd || 0).toNumber(),
    )
    .slice(0, TOP_TREASURY_ASSETS_COUNT);
  const treasuryUsdValue = assets
    .reduce(
      (result, asset) => result.plus(asset.valueUsd || 0),
      new BigNumber(0),
    )
    .toString();
  const treasuryAddressValue = treasuryTokens.walletAddress || treasuryAddress;

  const listData = [
    {
      label: (
        <LabelWithLink>
          Treasury Value
          <DebankIconLink address={treasuryAddressValue} />
        </LabelWithLink>
      ),
      value: (
        <LoadableContent loading={tokensLoading}>
          <ValueWrapper>
            <ValueDisplay
              value={treasuryUsdValue}
              symbol=""
              prefix="$"
              showNotEqualTooltip
            />
          </ValueWrapper>
        </LoadableContent>
      ),
    },
    {
      label: "Treasury Address",
      value: (
        <LoadableContent loading={treasuryAddressLoading}>
          <LidoAddressDetailAddress address={treasuryAddress} />
        </LoadableContent>
      ),
    },
  ];
  const topAssetListData = topAssets.map((asset) => ({
    label: getAssetLabel(asset),
    value: (
      <LoadableContent loading={tokensLoading}>
        <ValueWrapper>
          <ValueDisplay
            value={asset.valueUsd}
            symbol=""
            prefix="$"
            showNotEqualTooltip
          />
        </ValueWrapper>
      </LoadableContent>
    ),
  }));

  return (
    <Panel>
      <List data={listData} />
      <Advanced>
        <List data={topAssetListData} compact />
      </Advanced>
    </Panel>
  );
}

function LidoTreasuryOverview({ treasuryAddress, treasuryAddressLoading }) {
  return (
    <LidoTreasurySummary
      treasuryAddress={treasuryAddress}
      treasuryAddressLoading={treasuryAddressLoading}
    />
  );
}

function LidoTreasuryIncomeTableView({
  type = LIDO_TREASURY_INCOME_TYPES.eth,
  bordered = true,
}) {
  const { data, loading } = useLidoTreasuryTransfersData({ type });
  const showEthFeeFields = type === LIDO_TREASURY_INCOME_TYPES.eth;
  const showShares = type === LIDO_TREASURY_INCOME_TYPES.steth;

  return (
    <LidoTreasuryIncomeTable
      data={data}
      loading={loading}
      bordered={bordered}
      showEthFeeFields={showEthFeeFields}
      showShares={showShares}
    />
  );
}

function LidoTreasuryIncomeTabs() {
  const { sub } = useQueryParams({ parseNumbers: false });
  const location = useLocation();
  const navigate = useNavigate();
  const selectedTab = sub || LIDO_TREASURY_INCOME_TYPES.eth;
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
    <Panel>
      <TabBar
        tabs={treasuryIncomeTabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />

      <LidoTreasuryIncomeTableView type={selectedTab} bordered={false} />
    </Panel>
  );
}

export function LidoTreasuryIncome() {
  const filter = useLidoTreasuryTransfersFilter();

  return (
    <Layout>
      <BreadCrumb
        data={[{ name: "Treasury", path: "/treasury" }, { name: "Income" }]}
      />

      <Filter data={filter} />

      <LidoTreasuryIncomeTabs />
    </Layout>
  );
}

export default function LidoTreasury() {
  const { data: treasuryAddress, loading: treasuryAddressLoading } =
    useLidoTreasuryAddressData();
  const breadCrumb = <BreadCrumb data={[{ name: "Treasury" }]} />;
  const tabs = [
    {
      name: "Income",
      value: "income",
      children: <LidoTreasuryIncomeTabs />,
    },
  ];

  return (
    <DetailLayout breadCrumb={breadCrumb}>
      <LidoTreasuryOverview
        treasuryAddress={treasuryAddress}
        treasuryAddressLoading={treasuryAddressLoading}
      />
      <DetailTabs tabs={tabs} resetPage={false} />
    </DetailLayout>
  );
}
