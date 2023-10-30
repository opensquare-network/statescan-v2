import { Panel } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import List from "../components/list";
import { addressEllipsis } from "@osn/common";
import DetailLayout from "../components/layout/detailLayout";
import useAchainableProfile from "../hooks/useAchainableProfile";
import useOnChainAccountData from "../hooks/useOnChainAccountData";
import useAccountInfo from "../hooks/useAccountInfo";
import { toOnChainAccountDetailItem } from "../utils/viewFuncs/toDetailItem";
import AccountDetailCommon from "../components/account/detailCommon";
import { useDispatch } from "react-redux";
import { clearHttpError } from "../utils/viewFuncs/errorHandles";
import { setErrorCode } from "../store/reducers/httpErrorSlice";
import { useMultisigAddressData } from "../hooks/multisig/useMultisigAddressData";
import { TextSecondary } from "../components/styled/text";
import Divider from "../components/styled/divider";

function OnChainAccount() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const achainableProfile = useAchainableProfile(id);

  const accountData = useOnChainAccountData(id);
  const accountInfo = useAccountInfo(accountData);

  const { data: multisigAddressData } = useMultisigAddressData(id);

  useEffect(() => {
    clearHttpError(dispatch);
    if (accountData === null) {
      // Handle failed to load block data
      dispatch(setErrorCode(404));
    }
  }, [dispatch, accountData]);

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

        {multisigAddressData && (
          <div>
            <Divider />

            <List
              data={{
                Threshold: (
                  <TextSecondary>
                    {multisigAddressData.multisigAddress?.threshold || 0}
                  </TextSecondary>
                ),
                Signatories: (
                  <TextSecondary>
                    {multisigAddressData.multisigAddress?.signatories?.length ||
                      0}
                  </TextSecondary>
                ),
              }}
            />
          </div>
        )}
      </Panel>

      <AccountDetailCommon />
    </DetailLayout>
  );
}

export default OnChainAccount;
