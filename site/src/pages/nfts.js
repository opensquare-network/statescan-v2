import { StyledPanelTableWrapper } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { useCallback, useEffect, useState } from "react";
import { nftsHead, LIST_DEFAULT_PAGE_SIZE } from "../utils/constants";
import Layout from "../components/layout";
import Table from "../components/table";
import Pagination from "../components/pagination";
import { useLocation } from "react-router-dom";
import { getPageFromQuery } from "../utils/viewFuncs";
import { useDispatch, useSelector } from "react-redux";
import {
  nftFetchList,
  nftListLoadingSelector,
  nftListSelector,
  clearNftList,
} from "../store/reducers/nftSlice";
import { useNftsTableData } from "../utils/hooks/useNftsTableData";
import { useNftFilter } from "../utils/hooks/nftFilter";
import Filter from "../components/filter";
import * as queryString from "query-string";
import omit from "lodash.omit";
import { NftClassPreview } from "../components/nft/preview";

function Nfts() {
  const location = useLocation();
  const dispatch = useDispatch();
  const page = getPageFromQuery(location);
  const pageSize = LIST_DEFAULT_PAGE_SIZE;
  const [previewNft, setPreviewNft] = useState();
  const [isPreview, setIsPreview] = useState(false);

  const showPreview = useCallback((nft) => {
    setPreviewNft(nft);
    setIsPreview(true);
  }, []);

  const list = useSelector(nftListSelector);
  const loading = useSelector(nftListLoadingSelector);
  const data = useNftsTableData({ showPreview });
  const filters = useNftFilter();

  useEffect(() => {
    const controller = new AbortController();

    dispatch(
      nftFetchList(
        page - 1,
        pageSize,
        omit(queryString.parse(location.search), ["page"]),
        {
          signal: controller.signal,
        },
      ),
    );

    return () => controller.abort();
  }, [dispatch, location, page, pageSize]);

  useEffect(() => {
    return () => {
      dispatch(clearNftList());
    };
  }, [dispatch]);

  return (
    <Layout>
      <BreadCrumb data={[{ name: "NFT" }]} />
      <Filter
        title={`All ${list?.total?.toLocaleString?.() ?? ""} NFT classes`}
        data={filters}
      />
      <StyledPanelTableWrapper
        footer={
          <Pagination
            page={parseInt(page)}
            pageSize={pageSize}
            total={list?.total}
          />
        }
      >
        <Table heads={nftsHead} data={data} loading={loading} />
      </StyledPanelTableWrapper>
      <NftClassPreview
        open={isPreview}
        nftClass={previewNft}
        onClose={() => setIsPreview(false)}
      />
    </Layout>
  );
}

export default Nfts;
