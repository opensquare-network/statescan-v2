import BreadCrumb from "../components/breadCrumb";
import { useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Panel } from "../components/styled/panel";
import List from "../components/list";
import { toAssetDetailItem } from "../utils/viewFuncs/toDetailItem";
import AssetInfo from "../components/asset/assetInfo";
import {
  Analytics,
  Holders,
  holdersHead,
  Timeline,
  Transfers,
} from "../utils/constants";
import DetailTable from "../components/detail/table";
import { toHoldersTabTableItem } from "../utils/viewFuncs/toTableItem";
import AssetTimeline from "../components/asset/timeline";
import AssetAnalyticsChart from "../components/charts/assetAnalytics";
import DetailLayout from "../components/layout/detailLayout";
import DetailTabs from "../components/detail/tabs";
import { useQuery } from "@apollo/client";
import { ASSET_DETAIL } from "../services/gql/assets";
import AssetTransfers from "../components/asset/transfers";

function Asset() {
  const { assetId } = useParams();
  const { data } = useQuery(ASSET_DETAIL, {
    variables: {
      id: parseInt(assetId),
    },
  });
  const detail = data?.asset;

  const listData = useMemo(
    () => (detail ? toAssetDetailItem(assetId, detail) : {}),
    [assetId, detail],
  );

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
        <AssetTransfers assetId={assetId} metadata={detail?.metadata} />
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
        <List header={<AssetInfo detail={detail} />} data={listData} />
      </Panel>

      <DetailTabs tabs={tabs} />
    </DetailLayout>
  );
}

export default Asset;
