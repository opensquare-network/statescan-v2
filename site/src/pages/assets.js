import { StyledPanelTableWrapper } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { useEffect } from "react";
import { assetsHead, LIST_DEFAULT_PAGE_SIZE } from "../utils/constants";
import Layout from "../components/layout";
import Table from "../components/table";
import Pagination from "../components/pagination";
import { useLocation } from "react-router-dom";
import { bigNumberToLocaleString, getPageFromQuery } from "../utils/viewFuncs";
import { toPrecision } from "@osn/common";
import ValueDisplay from "../components/displayValue";
import { useDispatch, useSelector } from "react-redux";
import AddressOrIdentity from "../components/address";
import {
  assetFetchList,
  assetListLoadingSelector,
  assetListSelector,
  cleanAssetList,
} from "../store/reducers/assetSlice";
import { ColoredInterLink } from "../components/styled/link";
import Tooltip from "../components/tooltip";
import SymbolName from "../components/symbol/name";
import Symbol from "../components/symbol";
import styled from "styled-components";
import { Inter_12_600 } from "../styles/text";

const TipTitle = styled.div`
  ${Inter_12_600}
`;

function TotalSupplyTip({ supply }) {
  return (
    <div>
      <TipTitle>Total Supply</TipTitle>
      <div>{bigNumberToLocaleString(supply)}</div>
    </div>
  );
}

function Assets() {
  const location = useLocation();
  const dispatch = useDispatch();
  const page = getPageFromQuery(location);
  const pageSize = LIST_DEFAULT_PAGE_SIZE;

  const list = useSelector(assetListSelector);
  const loading = useSelector(assetListLoadingSelector);

  useEffect(() => {
    const controller = new AbortController();

    dispatch(
      assetFetchList(page - 1, pageSize, null, {
        signal: controller.signal,
      }),
    );

    return () => controller.abort();
  }, [dispatch, page, pageSize]);

  useEffect(() => {
    dispatch(cleanAssetList());
  }, [dispatch]);

  const data =
    list?.items?.map((asset) => {
      const supply = toPrecision(
        asset?.detail?.supply,
        asset?.metadata?.decimals,
      );
      return [
        <ColoredInterLink to={`/asset/${asset.assetId}_${asset.assetHeight}`}>
          #{asset.assetId}
        </ColoredInterLink>,
        asset?.metadata?.symbol ? (
          <Symbol detail={asset?.detail} symbol={asset.metadata.symbol} />
        ) : (
          "--"
        ),
        asset?.metadata?.name ? (
          <SymbolName name={asset.metadata.name} />
        ) : (
          "--"
        ),
        <Tooltip tip={asset?.detail?.owner}>
          <AddressOrIdentity address={asset?.detail?.owner} />
        </Tooltip>,
        <Tooltip tip={asset?.detail?.issuer}>
          <AddressOrIdentity address={asset?.detail?.issuer} />
        </Tooltip>,
        asset?.detail?.accounts,
        <Tooltip pullRight={true} tip={<TotalSupplyTip supply={supply} />}>
          <ValueDisplay value={supply} symbol={asset.symbol} />
        </Tooltip>,
      ];
    }) ?? null;

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Assets" }]} />
      <StyledPanelTableWrapper
        footer={
          <Pagination
            page={parseInt(page)}
            pageSize={pageSize}
            total={list?.total}
          />
        }
      >
        <Table heads={assetsHead} data={data} loading={loading} />
      </StyledPanelTableWrapper>
    </Layout>
  );
}

export default Assets;
