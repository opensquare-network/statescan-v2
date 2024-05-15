import { useQuery } from "@apollo/client";
import { ASSET_HOLDERS_LIST } from "../../services/gql/assets";
import { useQueryParams } from "../../hooks/useQueryParams";
import { LIST_DEFAULT_PAGE_SIZE, holdersHead } from "../../utils/constants";
import { StyledPanelTableWrapper } from "../styled/panel";
import Pagination from "../pagination";
import Table from "../table";
import Tooltip from "../tooltip";
import AddressOrIdentity from "../address";
import { bigNumberToLocaleString } from "../../utils/viewFuncs";
import { toPrecision } from "@osn/common";

export default function AssetHolders({ assetId }) {
  const { page = 1 } = useQueryParams();
  const pageSize = LIST_DEFAULT_PAGE_SIZE;

  const { data, loading } = useQuery(ASSET_HOLDERS_LIST, {
    variables: {
      assetId: parseInt(assetId),
      limit: pageSize,
      offset: (page - 1) * pageSize,
    },
  });

  const tableData = data?.assetHolders?.holders?.map((holder, index) => {
    return [
      index + 1,
      <Tooltip tip={holder?.address}>
        <AddressOrIdentity
          key={holder?.address}
          address={holder?.address}
          ellipsis={false}
        />
      </Tooltip>,
      bigNumberToLocaleString(
        toPrecision(holder?.balance, holder?.asset?.metadata?.decimals),
      ),
    ];
  });

  return (
    <StyledPanelTableWrapper
      footer={
        <Pagination
          page={page}
          pageSize={pageSize}
          total={data?.assetHolders?.total || 0}
        />
      }
    >
      <Table heads={holdersHead} data={tableData} loading={loading} />
    </StyledPanelTableWrapper>
  );
}
