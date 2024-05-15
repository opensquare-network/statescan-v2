import { useQuery } from "@apollo/client";
import TransfersTable from "../transfer/table";
import { StyledPanelTableWrapper } from "../styled/panel";
import Pagination from "../pagination";
import { ASSET_TRANSFERS_LIST } from "../../services/gql/assets";
import { LIST_DEFAULT_PAGE_SIZE } from "../../utils/constants";
import { useQueryParams } from "../../hooks/useQueryParams";

export default function AssetTransfers({ assetId, metadata }) {
  const { page = 1 } = useQueryParams();
  const pageSize = LIST_DEFAULT_PAGE_SIZE;

  const { data, loading } = useQuery(GET_ASSET_TRANSFERS_LIST, {
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
          total={data?.assetTransfers?.total || 0}
        />
      }
    >
      <TransfersTable
        data={data?.assetTransfers?.transfers}
        loading={loading}
        decimals={metadata?.decimals}
        symbol={metadata?.symbol}
      />
    </StyledPanelTableWrapper>
  );
}
