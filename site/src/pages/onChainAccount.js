import { Panel } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import List from "../components/list";
import { addressEllipsis } from "@osn/common";
import DetailLayout from "../components/layout/detailLayout";
import useAchainableProfile from "../hooks/useAchainableProfile";
import useOnChainAccountData from "../hooks/useOnChainAccountData";
import useAccountInfo from "../hooks/useAccountInfo";
import { toOnChainAccountDetailItem } from "../utils/viewFuncs/toDetailItem";
import AccountDetailCommon from "../components/account/detailCommon";

function OnChainAccount() {
  const { id } = useParams();
  const achainableProfile = useAchainableProfile(id);

  const accountData = useOnChainAccountData(id);
  const accountInfo = useAccountInfo(accountData);

  const detail = useMemo(() => {
    if (!accountInfo) {
      return null;
    }
    return {
      address: id,
      ...accountInfo,
    };
  }, [accountInfo, id]);

  const listData = useMemo(() => {
    if (!detail) {
      return {};
    }
    return toOnChainAccountDetailItem(id, detail, achainableProfile);
  }, [id, detail, achainableProfile]);

  const breadCrumb = (
    <BreadCrumb
      data={[
        { name: "Accounts", path: "/accounts" },
        { name: addressEllipsis(id) },
      ]}
    />
  );

  return (
    <DetailLayout breadCrumb={breadCrumb}>
      <Panel>
        <List data={listData} />
      </Panel>

      <AccountDetailCommon />
    </DetailLayout>
  );
}

export default OnChainAccount;
