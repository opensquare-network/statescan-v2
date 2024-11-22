import { Panel } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import List from "../components/list";
import { addressEllipsis } from "@osn/common";
import DetailLayout from "../components/layout/detailLayout";
import { toOnChainAccountDetailItem } from "../utils/viewFuncs/toDetailItem";
import AccountDetailCommon from "../components/account/detailCommon";
import { useDispatch } from "react-redux";
import { clearHttpError } from "../utils/viewFuncs/errorHandles";
import { setErrorCode } from "../store/reducers/httpErrorSlice";
import { useMultisigAddressData } from "../hooks/multisig/useMultisigAddressData";
import { useQueryAccountInfo } from "../hooks/useQueryAccountInfo";
import useOnChainAccountData from "../hooks/useOnChainAccountData";
import useAccountInfo from "../hooks/useAccountInfo";

function OnChainAccount() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { data } = useQueryAccountInfo(id);

  const accountData = useOnChainAccountData(id);
  const accountInfo = useAccountInfo(accountData);

  const chainAccount = data?.chainAccount || accountInfo;

  const { data: multisigAddressData } = useMultisigAddressData(id);

  useEffect(() => {
    clearHttpError(dispatch);
    if (chainAccount === null) {
      // Handle failed to load block data
      dispatch(setErrorCode(404));
    }
  }, [dispatch, chainAccount]);

  const detail = useMemo(() => {
    if (!chainAccount) {
      return null;
    }
    return {
      address: id,
      ...chainAccount,
    };
  }, [chainAccount, id]);

  const listData = useMemo(() => {
    if (!detail) {
      return {};
    }
    return toOnChainAccountDetailItem(id, detail, multisigAddressData);
  }, [id, detail, multisigAddressData]);

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
