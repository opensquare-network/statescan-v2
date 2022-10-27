import { StyledPanelTableWrapper } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { useEffect, useState } from "react";
import {
  basicFilters,
  LIST_DEFAULT_PAGE_SIZE,
  transfersHead,
} from "../utils/constants";
import { ColoredLink } from "../components/styled/link";
import Layout from "../components/layout";
import Table from "../components/table";
import Api from "../services/api";
import Pagination from "../components/pagination";
import { useLocation } from "react-router-dom";
import { getPageFromQuery } from "../utils/viewFuncs";
import { toPrecision } from "@osn/common";
import ValueDisplay from "../components/displayValue";
import { useSelector } from "react-redux";
import { chainSettingSelector } from "../store/reducers/settingSlice";
import Filter from "../components/filter";
import * as queryString from "query-string";
import Tooltip from "../components/tooltip";
import AddressOrIdentity from "../components/address";

function Transfers() {
  const location = useLocation();
  const chainSetting = useSelector(chainSettingSelector);
  const [transfers, setTransfers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(null);
  const page = getPageFromQuery(location);
  const pageSize = LIST_DEFAULT_PAGE_SIZE;

  useEffect(() => {
    setLoading(false);
    Api.fetch(`/transfers`, {
      page: getPageFromQuery(location) - 1,
      pageSize,
      ...queryString.parse(location.search),
    })
      .then(({ result }) => {
        setTransfers(result?.items ?? []);
        setTotal(result?.total ?? 0);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [location, pageSize]);

  const data =
    transfers?.map((transfer, index) => {
      return [
        <ColoredLink
          key={`${index}-1`}
          to={`/event/${transfer?.indexer?.blockHeight}-${transfer?.indexer?.eventIndex}`}
        >
          {transfer?.indexer?.blockHeight.toLocaleString()}-
          {transfer?.indexer?.eventIndex}
        </ColoredLink>,
        <ColoredLink
          key={`${index}-1`}
          to={`/extrinsic/${transfer?.indexer?.blockHeight}-${transfer?.indexer?.extrinsicIndex}`}
        >
          {transfer?.indexer?.blockHeight.toLocaleString()}-
          {transfer?.indexer?.extrinsicIndex}
        </ColoredLink>,
        <ColoredLink
          key={`${index}-2`}
          to={`/block/${transfer?.indexer?.blockHeight}`}
        >
          {transfer?.indexer?.blockHeight.toLocaleString()}
        </ColoredLink>,
        transfer?.indexer?.blockTime,
        <Tooltip tip={transfer?.from}>
          <AddressOrIdentity address={transfer?.from} />
        </Tooltip>,
        <Tooltip tip={transfer?.to}>
          <AddressOrIdentity address={transfer?.to} />
        </Tooltip>,
        <ValueDisplay
          value={toPrecision(
            transfer?.balance?.$numberDecimal,
            chainSetting.decimals,
          )}
          symbol={chainSetting.symbol}
        />,
      ];
    }) ?? null;

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Transfers" }]} />
      <Filter
        title={`All ${total?.toLocaleString() ?? "gi"} transfers`}
        data={basicFilters}
      />
      <StyledPanelTableWrapper>
        <Table heads={transfersHead} data={data} loading={loading} />
        <Pagination page={parseInt(page)} pageSize={pageSize} total={total} />
      </StyledPanelTableWrapper>
    </Layout>
  );
}

export default Transfers;
