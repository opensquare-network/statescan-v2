import { StyledPanelTableWrapper } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { useEffect } from "react";
import { extrinsicsHead, LIST_DEFAULT_PAGE_SIZE } from "../utils/constants";
import Layout from "../components/layout";
import Table from "../components/table";
import Pagination from "../components/pagination";
import { useLocation } from "react-router-dom";
import { getPageFromQuery } from "../utils/viewFuncs";
import Filter from "../components/filter";
import * as queryString from "query-string";
import { useExtrinsicFilter } from "../utils/hooks/extrinsicFilter";
import { useDispatch, useSelector } from "react-redux";
import {
  clearExtrinsicList,
  extrinsicFetchList,
  extrinsicListLoadingSelector,
  extrinsicListSelector,
} from "../store/reducers/extrinsicSlice";
import omit from "lodash.omit";
import { toExtrinsicsTabTableItem } from "../utils/viewFuncs/toTableItem";

function Extrinsics() {
  const location = useLocation();
  const dispatch = useDispatch();
  const page = getPageFromQuery(location);
  const pageSize = LIST_DEFAULT_PAGE_SIZE;
  const filters = useExtrinsicFilter();

  const list = useSelector(extrinsicListSelector);
  const loading = useSelector(extrinsicListLoadingSelector);

  useEffect(() => {
    const controller = new AbortController();

    dispatch(
      extrinsicFetchList(
        page - 1,
        pageSize,
        {
          signed_only: "true",
          ...omit(queryString.parse(location.search), ["page"]),
        },
        { signal: controller.signal },
      ),
    );

    return () => controller.abort();
  }, [dispatch, location, page, pageSize]);

  useEffect(() => {
    dispatch(clearExtrinsicList());
  }, [dispatch]);

  const data = toExtrinsicsTabTableItem(list?.items);

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Extrinsics" }]} />
      <Filter
        title={`All ${list?.total?.toLocaleString?.() ?? ""} extrinsics`}
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
        <Table heads={extrinsicsHead} data={data} loading={loading} />
      </StyledPanelTableWrapper>
    </Layout>
  );
}

export default Extrinsics;
