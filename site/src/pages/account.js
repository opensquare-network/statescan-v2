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
  accountExtinsicsHead,
  Extrinsics,
  Transfers,
  transfersHead,
} from "../utils/constants";
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
  resetAccountDetail,
} from "../store/reducers/accountSlice";
import DetailTabs from "../components/detail/tabs";

function Account() {
  const { id } = useParams();
  const chainSetting = useSelector(chainSettingSelector);
  const dispatch = useDispatch();
  const tablesData = useSelector(detailTablesSelector);

  const detail = useSelector(accountDetailSelector);

  const listData = useMemo(
    () => (detail ? toAccountDetailItem(id, detail, chainSetting) : {}),
    [id, detail, chainSetting],
  );

  useEffect(() => {
    return () => {
      dispatch(clearDetailTables());
    };
  }, [dispatch]);

  const transfersApiKey = `/accounts/${id}/transfers`;
  const extrinsicsApiKey = `/accounts/${id}/extrinsics`;

  const tabs = [
    {
      name: Transfers,
      count: tablesData?.[transfersApiKey]?.total,
      children: (
        <DetailTable
          url={transfersApiKey}
          heads={transfersHead}
          transformData={toTransferTabTableItem}
        />
      ),
    },
    {
      name: Extrinsics,
      count: tablesData?.[extrinsicsApiKey]?.total,
      children: (
        <DetailTable
          url={extrinsicsApiKey}
          heads={accountExtinsicsHead}
          transformData={toExtrinsicsTabTableItem}
        />
      ),
    },
  ];

  useEffect(() => {
    if (id) {
      dispatch(accountFetchDetail(id));
    }

    return () => {
      dispatch(resetAccountDetail());
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

      <DetailTabs tabs={tabs} />
    </DetailLayout>
  );
}

export default Account;
