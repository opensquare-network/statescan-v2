import { Panel } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import List from "../components/list";
import { addressEllipsis } from "@osn/common";
import { useDispatch, useSelector } from "react-redux";
import { chainSettingSelector } from "../store/reducers/settingSlice";
import Tab from "../components/tab";
import { toAccountDetailItem } from "../utils/viewFuncs/toDetailItem";
import DetailLayout from "../components/layout/detailLayout";
import { getTabFromQuery } from "../utils/viewFuncs";
import {
  accountExtinsicsHead,
  Extrinsics,
  Transfers,
  transfersHead,
} from "../utils/constants";
import { Flex } from "../components/styled/flex";
import DetailTable from "../components/detail/table";
import {
  toExtrinsicsTabTableItem,
  toTransferTabTableItem,
} from "../utils/viewFuncs/toTableItem";
import {
  clearDetailTables,
  detailTablesSelector,
} from "../store/reducers/detailTablesSlice";
import {
  accountDetailSelector,
  accountFetchDetail,
} from "../store/reducers/accountSlice";

function Account() {
  const { id } = useParams();
  const location = useLocation();
  const [, setSearchParams] = useSearchParams();
  const [selectedTab, setTab] = useState(getTabFromQuery(location, Transfers));
  const chainSetting = useSelector(chainSettingSelector);
  const dispatch = useDispatch();
  const tablesData = useSelector(detailTablesSelector);

  const detail = useSelector(accountDetailSelector);

  const listData = useMemo(
    () => (detail ? toAccountDetailItem(id, detail, chainSetting) : {}),
    [id, detail, chainSetting],
  );

  const tabs = [
    { name: Extrinsics, count: tablesData?.accountExtrinsicsTable?.total },
    { name: Transfers, count: tablesData?.accountTransfersTable?.total },
  ];

  useEffect(() => {
    return () => {
      dispatch(clearDetailTables());
    };
  }, [dispatch]);

  const tables = [
    {
      name: Transfers,
      table: (
        <DetailTable
          url={`/accounts/${id}/transfers`}
          heads={transfersHead}
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
      dispatch(accountFetchDetail(id));
    }
  }, [dispatch, id]);

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
