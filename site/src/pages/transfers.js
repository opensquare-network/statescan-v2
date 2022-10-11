import { StyledPanelTableWrapper } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { useEffect, useState } from "react";
import { basicFilters, transfersHead } from "../utils/constants";
import { ColoredLink, ColoredMonoLink } from "../components/styled/link";
import Layout from "../components/layout";
import Table from "../components/table";
import Api from "../services/api";
import Pagination from "../components/pagination";
import { useLocation } from "react-router-dom";
import {
  addressEllipsis,
  getPageFromQuery,
  toPrecision,
} from "../utils/viewFuncs";
import ValueDisplay from "../components/displayValue";
import { useSelector } from "react-redux";
import { chainSettingSelector } from "../store/reducers/settingSlice";
import Filter from "../components/filter";
import * as queryString from "query-string";

function Transfers() {
  const location = useLocation();
  const chainSetting = useSelector(chainSettingSelector);
  const [transfers, setTransfers] = useState(null);
  const [total, setTotal] = useState(0);
  const page = getPageFromQuery(location);

  useEffect(() => {
    setTransfers(null);
    Api.fetch(`/transfers`, {
      page: getPageFromQuery(location) - 1,
      ...queryString.parse(location.search),
    }).then(({ result }) => {
      setTransfers(result?.items ?? []);
      setTotal(result?.total ?? 0);
    });
  }, [location]);

  const data =
    transfers?.map((transfer, index) => {
      return [
        <ColoredLink
          key={`${index}-1`}
          to={`/transfer/${transfer?.indexer?.blockHeight}-${transfer?.indexer?.eventIndex}`}
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
        <ColoredMonoLink to={`/accounts/${transfer?.from}`}>
          {addressEllipsis(transfer?.from)}
        </ColoredMonoLink>,
        <ColoredMonoLink to={`/accounts/${transfer?.to}`}>
          {addressEllipsis(transfer?.to)}
        </ColoredMonoLink>,
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
        title={`All ${total.toLocaleString()} transfers`}
        data={basicFilters}
      />
      <StyledPanelTableWrapper>
        <Table heads={transfersHead} data={data} />
        <Pagination page={parseInt(page)} pageSize={10} total={total} />
      </StyledPanelTableWrapper>
    </Layout>
  );
}

export default Transfers;
