import { StyledPanelTableWrapper } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { useEffect } from "react";
import { assetsHead, LIST_DEFAULT_PAGE_SIZE } from "../utils/constants";
import Layout from "../components/layout";
import Table from "../components/table";
import Pagination from "../components/pagination";
import { useLocation } from "react-router-dom";
import { getPageFromQuery } from "../utils/viewFuncs";
import { useDispatch, useSelector } from "react-redux";
import {
  assetFetchList,
  assetListLoadingSelector,
  assetListSelector,
  cleanAssetList,
} from "../store/reducers/assetSlice";
import { useAssetsTableData } from "../utils/hooks/useAssetsTableData";

function Assets() {
  const location = useLocation();
  const dispatch = useDispatch();
  const page = getPageFromQuery(location);
  const pageSize = LIST_DEFAULT_PAGE_SIZE;

  const list = useSelector(assetListSelector);
  const loading = useSelector(assetListLoadingSelector);
  const data = useAssetsTableData();

  useEffect(() => {
    const controller = new AbortController();

    dispatch(
      assetFetchList(page - 1, pageSize, null, {
        signal: controller.signal,
      }),
    );

    return () => {
      controller.abort();
      dispatch(cleanAssetList());
    };
  }, [dispatch, page, pageSize]);

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
