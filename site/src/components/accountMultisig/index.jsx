import { useParams } from "react-router-dom";
import { useMultisigAddressData } from "../../hooks/multisig/useMultisigAddressData";
import { Panel } from "../styled/panel";
import { useQueryParams } from "../../hooks/useQueryParams";
import useQueryParamsUpdater from "../../hooks/useQueryParamsUpdater";
import TabBar from "../accountIdentity/tabBar";
import { useCallback } from "react";
import AccountTabMultisigSignatories from "./signatories";
import AccountTabMultisigMultisigs from "./multisigs";
import { ReactComponent as IconMultisig } from "../icons/multisig.svg";
import { ReactComponent as IconMultisigAccount } from "../icons/multisig-account.svg";

export default function AccountTabMultisig() {
  const { id } = useParams();
  const { data: multisigAddressData } = useMultisigAddressData(id);
  const { sub } = useQueryParams();
  const updateQueryParams = useQueryParamsUpdater();

  const tabs = [
    {
      icon: <IconMultisig width={20} height={20} />,
      name: "multisigs",
      children: <AccountTabMultisigMultisigs />,
    },
    {
      icon: <IconMultisigAccount width={20} height={20} />,
      name: "signatories",
      children: (
        <AccountTabMultisigSignatories
          signatories={multisigAddressData?.multisigAddress?.signatories}
        />
      ),
    },
    ,
  ];
  let selectedTab = sub;
  if (!selectedTab) {
    selectedTab = tabs[0].name;
  }

  const content = tabs.find((tab) => tab.name === selectedTab)?.children;

  const setSelectedTab = useCallback(
    (tab) => {
      updateQueryParams("sub", tab);
    },
    [updateQueryParams],
  );

  return (
    <Panel>
      <TabBar
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      {content}
    </Panel>
  );
}
