import { useQuery } from "@apollo/client";
import { GET_ASSET_HOLDERS_LIST } from "../../services/gql/assets";
import { useQueryParams } from "../../hooks/useQueryParams";
import { LIST_DEFAULT_PAGE_SIZE, holdersHead } from "../../utils/constants";
import { StyledPanelTableWrapper } from "../styled/panel";
import Pagination from "../pagination";
import Table from "../table";
import Tooltip from "../tooltip";
import AddressOrIdentity from "../address";
import { bigNumberToLocaleString } from "../../utils/viewFuncs";
import { toPrecision } from "@osn/common";
import { useState } from "react";

export default function AssetHolders({ assetId }) {
  const { page = 1 } = useQueryParams();
  const pageSize = LIST_DEFAULT_PAGE_SIZE;
  const [data, setData] = useState();

  const { loading } = useQuery(GET_ASSET_HOLDERS_LIST, {
    variables: {
      assetId: parseInt(assetId),
      limit: pageSize,
      offset: (page - 1) * pageSize,
    },
    onCompleted: setData,
  });

  return (
    <AssetHoldersView
      holders={data?.assetHolders?.holders || []}
      loading={loading}
      page={page}
      pageSize={pageSize}
      total={data?.assetHolders?.total}
    />
  );
}

export function AssetHoldersView({ holders, total, page, pageSize, loading }) {
  const tableData = holders?.map?.((holder, index) => {
    const rank = (page - 1) * pageSize + index + 1;
    return [
      rank,
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
      footer={<Pagination page={page} pageSize={pageSize} total={total || 0} />}
    >
      <Table heads={holdersHead} data={tableData} loading={loading} />
    </StyledPanelTableWrapper>
  );
}
