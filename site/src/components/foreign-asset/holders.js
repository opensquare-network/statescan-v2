import { useState } from "react";
import { useQueryParams } from "../../hooks/useQueryParams";
import { LIST_DEFAULT_PAGE_SIZE } from "../../utils/constants";
import { useQuery } from "@apollo/client";
import { GET_FOREIGN_ASSET_HOLDERS_LIST } from "../../services/gql/foreignAsset";
import { AssetHoldersView } from "../asset/holders";

export default function ForeignAssetHolders({ assetId }) {
  const { page = 1 } = useQueryParams();
  const pageSize = LIST_DEFAULT_PAGE_SIZE;
  const [data, setData] = useState();

  const { loading } = useQuery(GET_FOREIGN_ASSET_HOLDERS_LIST, {
    variables: {
      assetId: assetId,
      limit: pageSize,
      offset: (page - 1) * pageSize,
    },
    onCompleted: setData,
  });

  return (
    <AssetHoldersView
      holders={data?.foreignAssetHolders?.holders || []}
      loading={loading}
      page={page}
      pageSize={pageSize}
      total={data?.foreignAssetHolders?.total}
    />
  );
}
