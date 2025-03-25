import BreadCrumb from "../components/breadCrumb";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Panel } from "../components/styled/panel";
import List from "../components/list";
import { toForeignAssetDetailItem } from "../utils/viewFuncs/toDetailItem";
import AssetInfo from "../components/asset/assetInfo";
import { Holders, Timeline, Transfers } from "../utils/constants";
import DetailLayout from "../components/layout/detailLayout";
import DetailTabs from "../components/detail/tabs";
import { useQuery } from "@apollo/client";
import {
  GET_FOREIGN_ASSET_COUNTS,
  GET_FOREIGN_ASSET_DETAIL,
} from "../services/gql/foreignAsset";
import { addressEllipsis } from "@osn/common";
import ForeignAssetTransfers from "../components/foreign-asset/transfers";
import ForeignAssetHolders from "../components/foreign-asset/holders";
import ForeignAssetTimeline from "../components/foreign-asset/timeline";

function ForeignAsset() {
  const { assetId } = useParams();
  const { data } = useQuery(GET_FOREIGN_ASSET_DETAIL, {
    variables: {
      id: assetId,
    },
  });
  const {
    data: {
      foreignAssetTransfers,
      foreignAssetHolders,
      foreignAssetTimeline,
    } = {},
  } = useQuery(GET_FOREIGN_ASSET_COUNTS, {
    variables: {
      assetId: assetId,
    },
  });
  const detail = data?.foreignAsset;

  const listData = useMemo(
    () => (detail ? toForeignAssetDetailItem(assetId, detail) : {}),
    [assetId, detail],
  );

  const tabs = [
    {
      name: Transfers,
      count: foreignAssetTransfers?.total,
      children: <ForeignAssetTransfers assetId={assetId} asset={detail} />,
    },
    {
      name: Holders,
      count: foreignAssetHolders?.total,
      children: <ForeignAssetHolders assetId={assetId} />,
    },
    {
      name: Timeline,
      count: foreignAssetTimeline?.total,
      children: <ForeignAssetTimeline assetId={assetId} asset={detail} />,
    },
  ];

  const assetIdWithoutHeight = addressEllipsis(assetId);

  let breadCrumb = [
    { name: "ForeignAssets", path: "/foreign-assets" },
    { name: assetIdWithoutHeight },
  ];

  return (
    <DetailLayout breadCrumb={<BreadCrumb data={breadCrumb} />}>
      <Panel>
        <List header={<AssetInfo detail={detail} />} data={listData} />
      </Panel>

      <DetailTabs tabs={tabs} />
    </DetailLayout>
  );
}

export default ForeignAsset;
