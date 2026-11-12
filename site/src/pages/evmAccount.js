import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { addressEllipsis } from "@osn/common";
import BreadCrumb from "../components/breadCrumb";
import DetailLayout from "../components/layout/detailLayout";
import { Panel } from "../components/styled/panel";
import List from "../components/list";
import Loading from "../components/loadings/loading";
import DetailTable from "../components/detail/table";
import AccountDetailCommon from "../components/account/detailCommon";
import useReviveAccount from "../hooks/revive/useReviveAccount";
import useReviveAccountSummary from "../hooks/revive/useReviveAccountSummary";
import { useQueryAccountInfo } from "../hooks/useQueryAccountInfo";
import useOnChainAccountData from "../hooks/useOnChainAccountData";
import useAccountInfo from "../hooks/useAccountInfo";
import { useMultisigAddressData } from "../hooks/multisig/useMultisigAddressData";
import { toOnChainAccountDetailItem } from "../utils/viewFuncs/toDetailItem";
import { toAccountContractsTabTableItem } from "../utils/viewFuncs/toTableItem";
import { accountContractsHead, Contracts } from "../utils/constants";
import {
  reviveAccountCallsApi,
  reviveAccountContractsApi,
} from "../services/urls";
import { formatEvmAddress, normalizeEvmAddress } from "../utils/reviveAddress";
import NotFound from "./notFound";

function EvmAccountContent({ evmAddress, substrateAddress, accountType }) {
  const { data, loading } = useQueryAccountInfo(substrateAddress);
  const accountData = useOnChainAccountData(substrateAddress);
  const accountInfo = useAccountInfo(accountData);
  const { data: multisigAddressData } =
    useMultisigAddressData(substrateAddress);
  const summary = useReviveAccountSummary(evmAddress, substrateAddress);

  const chainAccount = data?.chainAccount || accountInfo;

  const listData = useMemo(() => {
    if (!chainAccount) {
      return {};
    }

    return toOnChainAccountDetailItem(
      evmAddress,
      chainAccount,
      multisigAddressData,
      { evmAddress, substrateAddress, accountType },
    );
  }, [
    evmAddress,
    chainAccount,
    multisigAddressData,
    substrateAddress,
    accountType,
  ]);

  const extraTabs = [
    {
      name: Contracts,
      count: summary?.contractsCount,
      children: (
        <DetailTable
          url={reviveAccountContractsApi(evmAddress)}
          heads={accountContractsHead}
          transformData={toAccountContractsTabTableItem}
        />
      ),
    },
  ];

  const reviveCalls = {
    url: reviveAccountCallsApi(evmAddress, substrateAddress),
    count: summary?.callsCount,
  };

  return (
    <>
      <Panel>
        {loading && !chainAccount ? <Loading /> : <List data={listData} />}
      </Panel>

      <AccountDetailCommon
        address={substrateAddress}
        extraTabs={extraTabs}
        reviveCalls={reviveCalls}
      />
    </>
  );
}

export default function EvmAccount() {
  const { id } = useParams();
  const evmAddress = normalizeEvmAddress(id);
  const displayAddress = formatEvmAddress(evmAddress);
  const { substrateAddress, accountType, isResolved } =
    useReviveAccount(evmAddress);

  const breadCrumb = (
    <BreadCrumb
      data={[
        { name: "Accounts", path: "/accounts" },
        { name: addressEllipsis(displayAddress) },
      ]}
    />
  );

  if (!evmAddress) {
    return <NotFound />;
  }

  if (!isResolved || !substrateAddress) {
    return (
      <DetailLayout breadCrumb={breadCrumb}>
        <Panel>
          <Loading />
        </Panel>
      </DetailLayout>
    );
  }

  return (
    <DetailLayout breadCrumb={breadCrumb}>
      <EvmAccountContent
        evmAddress={evmAddress}
        substrateAddress={substrateAddress}
        accountType={accountType}
      />
    </DetailLayout>
  );
}
