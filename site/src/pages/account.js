import { Panel } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { Fragment, useEffect, useState } from "react";
import Api from "../services/api";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import List from "../components/list";
import { addressEllipsis } from "@osn/common";
import { useDispatch, useSelector } from "react-redux";
import { chainSettingSelector } from "../store/reducers/settingSlice";
import Tab from "../components/tab";
import { toAccountDetailItem } from "../utils/viewFuncs/toDetailItem";
import {
  clearHttpError,
  handleApiError,
} from "../utils/viewFuncs/errorHeandles";
import DetailLayout from "../components/layout/detailLayout";
import { getTabFromQuery } from "../utils/viewFuncs";
import {
  accountExtinsicsHead,
  accountTransfersHead,
  Extrinsics,
  Transfers,
} from "../utils/constants";
import { Flex } from "../components/styled/flex";
import DetailTable from "../components/detail/table";
import {
  toExtrinsicsTabTableItem,
  toTransferTabTableItem,
} from "../utils/viewFuncs/toTableItem";
import { detailTablesSelector } from "../store/reducers/detailTablesSlice";

function Account() {
  const { id } = useParams();
  const location = useLocation();
  const [, setSearchParams] = useSearchParams();
  const [selectedTab, setTab] = useState(getTabFromQuery(location, Transfers));
  const [listData, setListData] = useState({});
  const chainSetting = useSelector(chainSettingSelector);
  const dispatch = useDispatch();
  const tablesData = useSelector(detailTablesSelector);

  const tabs = [
    { name: Transfers, count: tablesData?.accountTransfersTable?.total },
    { name: Extrinsics, count: tablesData?.accountTransfersTable?.total },
  ];

  const tables = [
    {
      name: Transfers,
      table: (
        <DetailTable
          url={`/accounts/${id}/transfers`}
          heads={accountTransfersHead}
          transformData={toTransferTabTableItem}
          tableKey="accountTransfersTable"
        />
      ),
    },
    {
      name: Extrinsics,
      table: (
        <DetailTable
          url={`/accounts/${id}/extrinsics`}
          heads={accountExtinsicsHead}
          transformData={toExtrinsicsTabTableItem}
          tableKey="accountExtrinsicsTable"
        />
      ),
    },
  ];

  useEffect(() => {
    if (id) {
      clearHttpError(dispatch);
      Api.fetch(`/accounts/${id}`, {})
        .then(({ result: account }) => {
          setListData(toAccountDetailItem(id, account, chainSetting));
        })
        .catch((e) => handleApiError(e, dispatch));
    }
  }, [dispatch, id, chainSetting]);

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
      <Flex>
        {tabs.map((item) => (
          <Tab
            key={item.name}
            text={item.name}
            count={item.count}
            active={selectedTab === item.name}
            onClick={() => {
              setTab(item.name);
              setSearchParams("");
            }}
          />
        ))}
      </Flex>

      {tables.map(
        (item) =>
          selectedTab === item.name && (
            <Fragment key={item.name}>{item.table}</Fragment>
          ),
      )}
    </DetailLayout>
  );
}

export default Account;
