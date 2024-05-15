import { useQuery } from "@apollo/client";
import Timeline from "../../timeline";
import AssetTimelineItemFields from "./itemFields";
import AssetTimelineItemIcon from "./itemIcon";
import { GET_ASSET_TIMELINE_LIST } from "../../../services/gql/assets";
import { StyledPanelTableWrapper } from "../../styled/panel";
import Pagination from "../../pagination";
import { useQueryParams } from "../../../hooks/useQueryParams";
import { LIST_DEFAULT_PAGE_SIZE } from "../../../utils/constants";

export default function AssetTimeline({ assetId, asset }) {
  const { page = 1 } = useQueryParams();
  const pageSize = LIST_DEFAULT_PAGE_SIZE;
  const { data, loading } = useQuery(GET_ASSET_TIMELINE_LIST, {
    variables: {
      assetId: parseInt(assetId),
      limit: pageSize,
      offset: (page - 1) * pageSize,
    },
  });

  return (
    <StyledPanelTableWrapper
      footer={
        <Pagination
          page={page}
          pageSize={pageSize}
          total={data?.assetTimeline?.total}
        />
      }
    >
      <Timeline
        data={asset}
        timeline={data?.assetTimeline?.items}
        loading={loading}
        IconComponent={AssetTimelineItemIcon}
        FieldsComponent={AssetTimelineItemFields}
      />
    </StyledPanelTableWrapper>
  );
}
