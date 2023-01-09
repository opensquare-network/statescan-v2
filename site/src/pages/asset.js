import BreadCrumb from "../components/breadCrumb";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
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
import {
  Analytics,
  Holders,
  holdersHead,
  Timeline,
  Transfers,
  transfersHead,
} from "../utils/constants";
import Tab from "../components/tab";
import {
  clearDetailTables,
  detailTablesSelector,
} from "../store/reducers/detailTablesSlice";
import { Flex } from "../components/styled/flex";
import DetailTable from "../components/detail/table";
import {
  toHoldersTabTableItem,
  toTransferTabTableItem,
} from "../utils/viewFuncs/toTableItem";
import AssetTimeline from "../components/asset/timeline/index";
import AssetAnalyticsChart from "../components/charts/assetAnalytics";

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

  const transfersApiKey =
    detail && `/asset/${detail?.assetId}_${detail?.assetHeight}/transfers`;
  const holdersApiKey =
    detail && `/asset/${detail?.assetId}_${detail?.assetHeight}/holders`;
  const timelineApiKey =
    detail && `/asset/${detail?.assetId}_${detail?.assetHeight}/timeline`;
  const analyticsApiKey =
    detail && `/asset/${detail?.assetId}_${detail?.assetHeight}/statistic`;

  const tabs = [
    { name: Transfers, count: tablesData?.[transfersApiKey]?.total },
    { name: Holders, count: tablesData?.[holdersApiKey]?.total },
    { name: Timeline, count: tablesData?.[timelineApiKey]?.total },
    { name: Analytics },
  ];

  const MyAssetTimeline = useCallback(
    ({ data, loading }) => (
      <AssetTimeline asset={detail} timeline={data} loading={loading} />
    ),
    [detail],
  );

  const tabComponents = [
    {
      name: Transfers,
      component: (
        <DetailTable
          url={transfersApiKey}
          heads={transfersHead}
          transformData={toTransferTabTableItem}
        />
      ),
    },
    {
      name: Holders,
      component: (
        <DetailTable
          url={holdersApiKey}
          heads={holdersHead}
          transformData={(data) => toHoldersTabTableItem(data, detail)}
        />
      ),
    },
    {
      name: Timeline,
      component: (
        <DetailTable url={timelineApiKey} TableComponent={MyAssetTimeline} />
      ),
    },
    {
      name: Analytics,
      component: <AssetAnalyticsChart url={analyticsApiKey} />,
    },
  ];

  useEffect(() => {
    if (assetId) {
      dispatch(assetFetchDetail(assetId));
    }
  }, [dispatch, assetId]);

  useEffect(() => {
    return () => {
      dispatch(clearDetailTables());
    };
  }, [dispatch]);

  return (
    <Layout>
      <BreadCrumb
        data={[{ name: "Assets", path: "/assets" }, { name: assetId }]}
      />
      <Panel>
        <AssetInfo
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

      {tabComponents.map(
        (item) =>
          selectedTab === item.name && (
            <Fragment key={item.name}>{item.component}</Fragment>
          ),
      )}
    </Layout>
  );
}

export default Asset;
