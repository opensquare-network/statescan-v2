import BreadCrumb from "../components/breadCrumb";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Panel } from "../components/styled/panel";
import List from "../components/list";
import { toAssetDetailItem } from "../utils/viewFuncs/toDetailItem";
import AssetInfo from "../components/asset/assetInfo";
import { Analytics, Holders, Timeline, Transfers } from "../utils/constants";
import AssetTimeline from "../components/asset/timeline";
import AssetAnalyticsChart from "../components/charts/assetAnalytics";
import DetailLayout from "../components/layout/detailLayout";
import DetailTabs from "../components/detail/tabs";
import { useQuery } from "@apollo/client";
import { ASSET_DETAIL } from "../services/gql/assets";
import AssetTransfers from "../components/asset/transfers";
import AssetHolders from "../components/asset/holders";

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

  const analyticsApiKey =
    detail && `/assets/${detail?.assetId}_${detail?.assetHeight}/statistic`;

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
      children: <AssetHolders assetId={assetId} />,
    },
    {
      name: Timeline,
      count: detail?.timelineCount,
      children: <AssetTimeline assetId={assetId} asset={detail} />,
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
