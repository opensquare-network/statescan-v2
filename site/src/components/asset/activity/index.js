import { useQuery } from "@apollo/client";
import Timeline from "../../timeline";
import AssetActivityItemFields from "./itemFields";
import AssetTimelineItemIcon from "../timeline/itemIcon";
import { GET_ASSET_ACTIVITY_LIST } from "../../../services/gql/assets";
import { StyledPanelTableWrapper } from "../../styled/panel";
import Pagination from "../../pagination";
import { useQueryParams } from "../../../hooks/useQueryParams";
import { LIST_DEFAULT_PAGE_SIZE } from "../../../utils/constants";
import { useState } from "react";

export default function AssetActivity({ assetId, asset }) {
  const { page = 1 } = useQueryParams();
  const pageSize = LIST_DEFAULT_PAGE_SIZE;
  const [data, setData] = useState();

  const { loading } = useQuery(GET_ASSET_ACTIVITY_LIST, {
    variables: {
      assetId: parseInt(assetId),
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
          total={data?.assetActivity?.total}
        />
      }
    >
      <Timeline
        data={asset}
        timeline={data?.assetActivity?.items}
        loading={loading}
        IconComponent={AssetTimelineItemIcon}
        FieldsComponent={AssetActivityItemFields}
      />
    </StyledPanelTableWrapper>
  );
}
