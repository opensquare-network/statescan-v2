import { useState } from "react";
import { useQueryParams } from "../../hooks/useQueryParams";
import { LIST_DEFAULT_PAGE_SIZE } from "../../utils/constants";
import { AssetTransfersView } from "../asset/transfers";
import { useQuery } from "@apollo/client";
import { GET_FOREIGN_ASSET_TRANSFERS_LIST } from "../../services/gql/foreignAsset";

export default function ForeignAssetTransfers({ assetId, asset }) {
  const { page = 1 } = useQueryParams();
  const pageSize = LIST_DEFAULT_PAGE_SIZE;
  const [data, setData] = useState();

  const { loading } = useQuery(GET_FOREIGN_ASSET_TRANSFERS_LIST, {
    variables: {
      assetId: assetId,
      limit: pageSize,
      offset: (page - 1) * pageSize,
    },
    onCompleted: setData,
  });

  return (
    <AssetTransfersView
      transfers={data?.foreignAssetTransfers?.transfers || []}
      asset={asset}
      loading={loading}
      page={page}
      pageSize={pageSize}
      total={data?.foreignAssetTransfers?.total}
    />
  );
}
