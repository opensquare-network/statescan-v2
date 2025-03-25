import { useQuery } from "@apollo/client";
import { StyledPanelTableWrapper } from "../styled/panel";
import Pagination from "../pagination";
import { GET_ASSET_TRANSFERS_LIST } from "../../services/gql/assets";
import { LIST_DEFAULT_PAGE_SIZE } from "../../utils/constants";
import { useQueryParams } from "../../hooks/useQueryParams";
import { toPrecision } from "@osn/common";
import { transfersHead } from "../../utils/constants";
import AddressOrIdentity from "../address";
import ValueDisplay from "../displayValue";
import ExtrinsicLink from "../extrinsic/link";
import { ColoredLink } from "../styled/link";
import Table from "../table";
import Tooltip from "../tooltip";
import { useState } from "react";

export default function AssetTransfers({ assetId, asset }) {
  const { page = 1 } = useQueryParams();
  const pageSize = LIST_DEFAULT_PAGE_SIZE;
  const [data, setData] = useState();

  const { loading } = useQuery(GET_ASSET_TRANSFERS_LIST, {
    variables: {
      assetId: parseInt(assetId),
      limit: pageSize,
      offset: (page - 1) * pageSize,
    },
    onCompleted: setData,
  });

  return (
    <AssetTransfersView
      transfers={data?.assetTransfers?.transfers || []}
      asset={asset}
      loading={loading}
      page={page}
      pageSize={pageSize}
      total={data?.assetTransfers?.total}
    />
  );
}

export function AssetTransfersView({
  transfers,
  asset,
  total,
  page,
  pageSize,
  loading,
}) {
  const tableData = transfers?.map?.((transfer, key) => {
    return [
      <ColoredLink
        key={`${key}-1`}
        to={`/events/${transfer?.indexer?.blockHeight}-${transfer?.indexer?.eventIndex}`}
      >
        {transfer?.indexer?.blockHeight.toLocaleString()}-
        {transfer?.indexer?.eventIndex}
      </ColoredLink>,
      <ExtrinsicLink key={`${key}-1`} indexer={transfer.indexer} />,
      transfer?.indexer?.blockTime,
      <Tooltip tip={transfer?.from}>
        <AddressOrIdentity key={transfer?.from} address={transfer?.from} />
      </Tooltip>,
      <Tooltip tip={transfer?.to}>
        <AddressOrIdentity key={transfer?.to} address={transfer?.to} />
      </Tooltip>,
      <ValueDisplay
        value={toPrecision(transfer?.balance, asset?.metadata?.decimals)}
        symbol={asset?.metadata?.symbol}
        showNotEqualTooltip
      />,
    ];
  });

  return (
    <StyledPanelTableWrapper
      footer={<Pagination page={page} pageSize={pageSize} total={total || 0} />}
    >
      <Table heads={transfersHead} data={tableData} loading={loading} />
    </StyledPanelTableWrapper>
  );
}
