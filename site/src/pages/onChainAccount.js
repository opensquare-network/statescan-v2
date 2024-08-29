import { Panel } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import List from "../components/list";
import { addressEllipsis } from "@osn/common";
import DetailLayout from "../components/layout/detailLayout";
import useAchainableProfile from "../hooks/useAchainableProfile";
import { toOnChainAccountDetailItem } from "../utils/viewFuncs/toDetailItem";
import AccountDetailCommon from "../components/account/detailCommon";
import { useDispatch } from "react-redux";
import { clearHttpError } from "../utils/viewFuncs/errorHandles";
import { setErrorCode } from "../store/reducers/httpErrorSlice";
import { useMultisigAddressData } from "../hooks/multisig/useMultisigAddressData";
import { useQueryAccountInfo } from "../hooks/useQueryAccountInfo";

function OnChainAccount() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const achainableProfile = useAchainableProfile(id);

  const { data } = useQueryAccountInfo(id);
  const accountInfo = data?.chainAccount;

  const { data: multisigAddressData } = useMultisigAddressData(id);

  useEffect(() => {
    clearHttpError(dispatch);
    if (accountInfo === null) {
      // Handle failed to load block data
      dispatch(setErrorCode(404));
    }
  }, [dispatch, accountInfo]);

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
    return toOnChainAccountDetailItem(
      id,
      detail,
      achainableProfile,
      multisigAddressData,
    );
  }, [id, detail, achainableProfile, multisigAddressData]);

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
