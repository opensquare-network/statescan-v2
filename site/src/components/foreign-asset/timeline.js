import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_FOREIGN_ASSET_TIMELINE_LIST } from "../../services/gql/foreignAsset";
import Timeline from "../timeline";
import Pagination from "../pagination";
import { useQueryParams } from "../../hooks/useQueryParams";
import { LIST_DEFAULT_PAGE_SIZE } from "../../utils/constants";
import { StyledPanelTableWrapper } from "../styled/panel";
import AssetTimelineItemIcon from "../asset/timeline/itemIcon";
import AssetTimelineItemFields from "../asset/timeline/itemFields";

export default function ForeignAssetTimeline({ assetId, asset }) {
  const { page = 1 } = useQueryParams();
  const pageSize = LIST_DEFAULT_PAGE_SIZE;
  const [data, setData] = useState();

  const { loading } = useQuery(GET_FOREIGN_ASSET_TIMELINE_LIST, {
    variables: {
      assetId: assetId,
      limit: pageSize,
      offset: (page - 1) * pageSize,
    },
    onCompleted: setData,
  });

  return (
    <StyledPanelTableWrapper
      footer={
        <Pagination
          page={page}
          pageSize={pageSize}
          total={data?.foreignAssetTimeline?.total}
        />
      }
    >
      <Timeline
        data={asset}
        timeline={data?.foreignAssetTimeline?.items}
        loading={loading}
        IconComponent={AssetTimelineItemIcon}
        FieldsComponent={AssetTimelineItemFields}
      />
    </StyledPanelTableWrapper>
  );
}
