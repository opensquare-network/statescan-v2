import { StyledPanelTableWrapper } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { useEffect } from "react";
import { assetsHead, LIST_DEFAULT_PAGE_SIZE } from "../utils/constants";
import Layout from "../components/layout";
import Table from "../components/table";
import Pagination from "../components/pagination";
import { useLocation } from "react-router-dom";
import { getPageFromQuery } from "../utils/viewFuncs";
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
      assetFetchList(getPageFromQuery(location) - 1, pageSize, null, {
        signal: controller.signal,
      }),
    );

    return () => controller.abort();
  }, [dispatch, location, pageSize]);

  useEffect(() => {
    dispatch(cleanAssetList());
  }, [dispatch]);

  const data =
    list?.items?.map((asset) => {
      return [
        <ColoredInterLink to={`/asset/${asset.assetId}`}>
          #{asset.assetId}
        </ColoredInterLink>,
        asset?.metadata?.symbol ?? "--",
        <Tooltip tip={asset?.detail?.owner}>
          <AddressOrIdentity address={asset?.detail?.owner} />
        </Tooltip>,
        <Tooltip tip={asset?.detail?.issuer}>
          <AddressOrIdentity address={asset?.detail?.issuer} />
        </Tooltip>,
        "-",
        asset?.detail?.accounts,
        <ValueDisplay
          value={toPrecision(asset?.detail?.supply, asset?.metadata?.decimals)}
          symbol={asset.symbol}
        />,
      ];
    }) ?? null;

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Assets" }]} />
      <StyledPanelTableWrapper>
        <Table heads={assetsHead} data={data} loading={loading} />
        <Pagination
          page={parseInt(page)}
          pageSize={pageSize}
          total={list?.total}
        />
      </StyledPanelTableWrapper>
    </Layout>
  );
}

export default Assets;
