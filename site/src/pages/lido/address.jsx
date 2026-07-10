import BigNumber from "bignumber.js";
import isNil from "lodash.isnil";
import { addressEllipsis } from "@osn/common";
import { useMemo } from "react";
import BreadCrumb from "../../components/breadCrumb";
import DetailLayout from "../../components/layout/detailLayout";
import DetailTabs from "../../components/detail/tabs";
import LidoAddressDetailAddress from "../../components/lido/addressDetailAddress";
import LoadableContent from "../../components/loadings/loadableContent";
import List from "../../components/list";
import { Panel } from "../../components/styled/panel";
import { TextSecondary } from "../../components/styled/text";
import ValueDisplay from "../../components/displayValue";
import { LidoDepositsTable } from "./deposits";
import { LidoWithdrawalsTable } from "./withdrawals";
import { LidoWstETHUnwrapsTable, LidoWstETHWrapsTable } from "./wstETHWraps";
import { useLidoOnchainStatsData } from "../../hooks/lido/useLidoOnchainStatsData";
import { useLidoAddressBalancesData } from "../../hooks/lido/useLidoAddressProfileData";
import { useParams } from "react-router-dom";
import { toLidoEtherAmount } from "../../utils/viewFuncs/lido";

function toApproximateValue(value) {
  return new BigNumber(value).toFormat(4);
}

function toDisplayValue(value, symbol) {
  return (
    <TextSecondary>
      <ValueDisplay
        value={toLidoEtherAmount(value ?? "0")}
        symbol={symbol}
        showNotEqualTooltip
      />
    </TextSecondary>
  );
}

function toWstEthValue(balance, stEthPerToken) {
  const value = toLidoEtherAmount(balance ?? "0");
  if (isNil(stEthPerToken)) {
    return (
      <TextSecondary>
        <ValueDisplay value={value} symbol="wstETH" />
      </TextSecondary>
    );
  }

  const ethValue = new BigNumber(value)
    .times(toLidoEtherAmount(stEthPerToken))
    .toFixed();

  return (
    <TextSecondary>
      <ValueDisplay
        value={value}
        symbol="wstETH"
        tooltipContent={`≈${toApproximateValue(ethValue)} ETH`}
      />
    </TextSecondary>
  );
}

function LidoAddressSummary({ address }) {
  const { data: balances, loading: balancesLoading } =
    useLidoAddressBalancesData(address);
  const { data: stats, loading: statsLoading } = useLidoOnchainStatsData();

  const listData = [
    {
      label: "Address",
      value: <LidoAddressDetailAddress address={address} />,
    },
    {
      label: "stETH Balance",
      value: (
        <LoadableContent loading={balancesLoading}>
          {toDisplayValue(balances.stEthBalance, "stETH")}
        </LoadableContent>
      ),
    },
    {
      label: "stETH Shares",
      value: (
        <LoadableContent loading={balancesLoading}>
          {toDisplayValue(balances.stEthShares, "shares")}
        </LoadableContent>
      ),
    },
    {
      label: "wstETH Balance",
      value: (
        <LoadableContent loading={balancesLoading || statsLoading}>
          {toWstEthValue(balances.wstEthBalance, stats?.stEthPerToken)}
        </LoadableContent>
      ),
    },
  ];

  return (
    <Panel>
      <List data={listData} />
    </Panel>
  );
}

function LidoAddressTabs({ address }) {
  const filters = useMemo(() => ({ address }), [address]);
  const tabs = [
    {
      name: "Deposits",
      value: "deposits",
      children: <LidoDepositsTable filters={filters} />,
    },
    {
      name: "Withdrawals",
      value: "withdrawals",
      children: <LidoWithdrawalsTable filters={filters} />,
    },
    {
      name: "Wrap",
      value: "wrap",
      children: <LidoWstETHWrapsTable filters={filters} />,
    },
    {
      name: "Unwrap",
      value: "unwrap",
      children: <LidoWstETHUnwrapsTable filters={filters} />,
    },
  ];

  return <DetailTabs tabs={tabs} resetPage={false} />;
}

export default function LidoAddress() {
  const { address } = useParams();

  const breadCrumb = (
    <BreadCrumb
      data={[{ name: "Addresses" }, { name: addressEllipsis(address) }]}
    />
  );

  return (
    <DetailLayout breadCrumb={breadCrumb}>
      <LidoAddressSummary address={address} />
      <LidoAddressTabs address={address} />
    </DetailLayout>
  );
}
