import { Panel } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { useEffect, useState } from "react";
import Api from "../services/api";
import { useParams } from "react-router-dom";
import List from "../components/list";
import { addressEllipsis } from "@osn/common";
import { useDispatch, useSelector } from "react-redux";
import { chainSettingSelector } from "../store/reducers/settingSlice";
import Tab from "../components/tab";
import TransfersTable from "../components/account/tabTables/transfersTable";
import { toAccountDetailItem } from "../utils/viewFuncs/toDetailItem";
import {
  clearHttpError,
  handleApiError,
} from "../utils/viewFuncs/errorHeandles";
import DetailLayout from "../components/layout/detailLayout";

function Account() {
  const { id } = useParams();
  const [listData, setListData] = useState({});
  const [transfersCount, setTransfersCount] = useState(0);
  const chainSetting = useSelector(chainSettingSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      clearHttpError(dispatch);
      Api.fetch(`/accounts/${id}`, {})
        .then(({ result: account }) => {
          setListData(toAccountDetailItem(id, account, chainSetting));
        })
        .catch((e) => handleApiError(e, dispatch));
    }
  }, [id, chainSetting]);

  const breadCrumbItems = (
    <BreadCrumb
      data={[
        { name: "Accounts", path: "/accounts" },
        { name: addressEllipsis(id) },
      ]}
    />
  );

  return (
    <DetailLayout breadCrumbItems={breadCrumbItems}>
      <Panel>
        <List data={listData} />
      </Panel>
      <Tab text={"Transfers"} count={transfersCount} active />
      <TransfersTable address={id} setTransfersCount={setTransfersCount} />
    </DetailLayout>
  );
}

export default Account;
