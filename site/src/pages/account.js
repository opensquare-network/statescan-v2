import { Panel } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import List from "../components/list";
import { addressEllipsis } from "@osn/common";
import { useDispatch, useSelector } from "react-redux";
import { chainSettingSelector } from "../store/reducers/settingSlice";
import { toAccountDetailItem } from "../utils/viewFuncs/toDetailItem";
import DetailLayout from "../components/layout/detailLayout";
import {
  accountDetailLoadingSelector,
  accountDetailSelector,
  accountFetchDetail,
  clearAccountDetail,
} from "../store/reducers/accountSlice";
import AccountDetailCommon from "../components/account/detailCommon";

function Account() {
  const { id } = useParams();
  const chainSetting = useSelector(chainSettingSelector);
  const dispatch = useDispatch();

  const detail = useSelector(accountDetailSelector);
  const detailLoading = useSelector(accountDetailLoadingSelector);

  const listData = useMemo(
    () => (detailLoading ? {} : toAccountDetailItem(id, detail, chainSetting)),
    [id, detail, detailLoading, chainSetting],
  );

  useEffect(() => {
    if (id) {
      dispatch(accountFetchDetail(id));
    }

    return () => {
      dispatch(clearAccountDetail());
    };
  }, [dispatch, id]);

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

export default Account;
