import BreadCrumb from "../components/breadCrumb";
import React, { useCallback, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Panel } from "../components/styled/panel";
import List from "../components/list";
import {
  assetDetailSelector,
  assetFetchDetail,
  clearAssetAnalytics,
  clearAssetDetail,
} from "../store/reducers/assetSlice";
import { toAssetDetailItem } from "../utils/viewFuncs/toDetailItem";
import AssetInfo from "../components/asset/assetInfo";
import {
  Analytics,
  Holders,
  holdersHead,
  Timeline,
  Transfers,
  transfersHead,
} from "../utils/constants";
import {
  clearDetailTables,
  detailTablesSelector,
} from "../store/reducers/detailTablesSlice";
import DetailTable from "../components/detail/table";
import {
  toHoldersTabTableItem,
  toTransferTabTableItem,
} from "../utils/viewFuncs/toTableItem";
import AssetTimeline from "../components/asset/timeline";
import AssetAnalyticsChart from "../components/charts/assetAnalytics";
import DetailLayout from "../components/layout/detailLayout";
import DetailTabs from "../components/detail/tabs";

function Asset() {
  const { assetId } = useParams();
  const dispatch = useDispatch();
  const tablesData = useSelector(detailTablesSelector);

  const detail = useSelector(assetDetailSelector);

  const listData = useMemo(
    () => (detail ? toAssetDetailItem(assetId, detail) : {}),
    [assetId, detail],
  );

  const transfersApiKey =
    detail && `/assets/${detail?.assetId}_${detail?.assetHeight}/transfers`;
  const holdersApiKey =
    detail && `/assets/${detail?.assetId}_${detail?.assetHeight}/holders`;
  const timelineApiKey =
    detail && `/assets/${detail?.assetId}_${detail?.assetHeight}/timeline`;
  const analyticsApiKey =
    detail && `/assets/${detail?.assetId}_${detail?.assetHeight}/statistic`;

  const MyAssetTimeline = useCallback(
    ({ data, loading }) => (
      <AssetTimeline asset={detail} timeline={data} loading={loading} />
    ),
    [detail],
  );

  const tabs = [
    {
      name: Transfers,
      count: detail?.transfersCount,
      children: (
        <DetailTable
          url={transfersApiKey}
          heads={transfersHead}
          transformData={toTransferTabTableItem}
        />
      ),
    },
    {
      name: Holders,
      count: detail?.holdersCount,
      children: (
        <DetailTable
          url={holdersApiKey}
          heads={holdersHead}
          transformData={(data) => toHoldersTabTableItem(data, detail)}
        />
      ),
    },
    {
      name: Timeline,
      count: detail?.timelineCount,
      children: (
        <DetailTable url={timelineApiKey} TableComponent={MyAssetTimeline} />
      ),
    },
    {
      name: Analytics,
      children: <AssetAnalyticsChart url={analyticsApiKey} />,
    },
  ];

  useEffect(() => {
    if (assetId) {
      dispatch(assetFetchDetail(assetId));
    }

    return () => {
      dispatch(clearAssetDetail());
    };
  }, [dispatch, assetId]);

  useEffect(() => {
    return () => {
      dispatch(clearDetailTables());
      dispatch(clearAssetAnalytics());
    };
  }, [dispatch]);

  const assetIdWithoutHeight = assetId.split("_").shift();

  let breadCrumb = [
    { name: "Assets", path: "/assets" },
    { name: assetIdWithoutHeight },
  ];

  if (detail?.destroyed) {
    breadCrumb = [
      { name: "Destroyed Assets", path: "/destroyed/assets" },
      { name: assetIdWithoutHeight },
    ];
  }

  return (
    <DetailLayout breadCrumb={<BreadCrumb data={breadCrumb} />}>
      <Panel>
        <List
          header={
            <AssetInfo
              symbol={detail?.metadata?.symbol}
              name={detail?.metadata?.name}
            />
          }
          data={listData}
        />
      </Panel>

      <DetailTabs tabs={tabs} />
    </DetailLayout>
  );
}

export default Asset;
