import BreadCrumb from "../components/breadCrumb";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import Layout from "../components/layout";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Panel } from "../components/styled/panel";
import List from "../components/list";
import {
  assetDetailSelector,
  assetFetchDetail,
} from "../store/reducers/assetSlice";
import { toAssetDetailItem } from "../utils/viewFuncs/toDetailItem";
import AssetInfo from "../components/asset/assetInfo";
import { getTabFromQuery } from "../utils/viewFuncs/index";
import { Transfers, transfersHead } from "../utils/constants";
import Tab from "../components/tab";
import { detailTablesSelector } from "../store/reducers/detailTablesSlice";
import { Flex } from "../components/styled/flex";
import DetailTable from "../components/detail/table";
import { toTransferTabTableItem } from "../utils/viewFuncs/toTableItem";

function Asset() {
  const { assetId } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const [selectedTab, setTab] = useState(getTabFromQuery(location, Transfers));
  const [, setSearchParams] = useSearchParams();
  const tablesData = useSelector(detailTablesSelector);

  const detail = useSelector(assetDetailSelector);

  const listData = useMemo(
    () => (detail ? toAssetDetailItem(assetId, detail) : {}),
    [assetId, detail],
  );

  const tabs = [
    { name: Transfers, count: tablesData?.assetTransfersTable?.total },
  ];

  const tables = [
    {
      name: Transfers,
      table: (
        <DetailTable
          url={
            detail &&
            `/asset/${detail?.assetId}_${detail?.assetHeight}/transfers`
          }
          heads={transfersHead}
          transformData={toTransferTabTableItem}
          tableKey="assetTransfersTable"
        />
      ),
    },
  ];

  useEffect(() => {
    if (assetId) {
      dispatch(assetFetchDetail(assetId));
    }
  }, [dispatch, assetId]);

  return (
    <Layout>
      <BreadCrumb
        data={[{ name: "Assets", path: "/assets" }, { name: assetId }]}
      />
      <Panel>
        <AssetInfo
          data={detail}
          symbol={detail?.metadata?.symbol}
          name={detail?.metadata?.name}
        />
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
    </Layout>
  );
}

export default Asset;
