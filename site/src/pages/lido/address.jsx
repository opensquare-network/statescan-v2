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
import {
  useLidoStETHHolderData,
  useLidoWstETHHolderData,
} from "../../hooks/lido/useLidoHolderData";
import { useLidoOnchainStatsData } from "../../hooks/lido/useLidoOnchainStatsData";
import { useLidoStEthSharesRateData } from "../../hooks/lido/useLidoStEthSharesRateData";
import { useParams } from "react-router-dom";
import {
  toStEthAmountFromShares,
  toLidoEtherAmount,
} from "../../utils/viewFuncs/lido";

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

function toStEthBalanceValue(shares, sharesRate) {
  if (isNil(shares)) {
    return (
      <TextSecondary>
        <ValueDisplay value="0" symbol="stETH" showNotEqualTooltip />
      </TextSecondary>
    );
  }

  const balance = toStEthAmountFromShares(shares, sharesRate);

  if (isNil(balance)) {
    return "--";
  }

  return (
    <TextSecondary>
      <ValueDisplay value={balance} symbol="stETH" showNotEqualTooltip />
    </TextSecondary>
  );
}

function LidoAddressSummary({ address }) {
  const { data: stEthHolder, loading: stEthHolderLoading } =
    useLidoStETHHolderData(address);
  const { data: wstEthHolder, loading: wstEthHolderLoading } =
    useLidoWstETHHolderData(address);
  const { data: stats, loading: statsLoading } = useLidoOnchainStatsData();
  const { data: sharesRate, loading: sharesRateLoading } =
    useLidoStEthSharesRateData();

  const listData = [
    {
      label: "Address",
      value: <LidoAddressDetailAddress address={address} />,
    },
    {
      label: "stETH Balance",
      value: (
        <LoadableContent loading={stEthHolderLoading || sharesRateLoading}>
          {toStEthBalanceValue(stEthHolder?.shares, sharesRate)}
        </LoadableContent>
      ),
    },
    {
      label: "stETH Shares",
      value: (
        <LoadableContent loading={stEthHolderLoading}>
          {toDisplayValue(stEthHolder?.shares, "shares")}
        </LoadableContent>
      ),
    },
    {
      label: "wstETH Balance",
      value: (
        <LoadableContent loading={wstEthHolderLoading || statsLoading}>
          {toWstEthValue(wstEthHolder?.balance, stats?.stEthPerToken)}
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
      children: <LidoDepositsTable filters={filters} />,
    },
    {
      name: "Withdrawals",
      children: <LidoWithdrawalsTable filters={filters} />,
    },
    {
      name: "Wrap",
      children: <LidoWstETHWrapsTable filters={filters} />,
    },
    {
      name: "Unwrap",
      children: <LidoWstETHUnwrapsTable filters={filters} />,
    },
  ];

  return <DetailTabs tabs={tabs} />;
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
