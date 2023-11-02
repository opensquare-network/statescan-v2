import { StyledPanelTableWrapper } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { useEffect } from "react";
import {
  extrinsicsHead,
  extrinsicsHeadSimpleMode,
  LIST_DEFAULT_PAGE_SIZE,
} from "../utils/constants";
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
import {
  toExtrinsicsTabTableItem,
  toExtrinsicsTabTableItemSimpleMode,
} from "../utils/viewFuncs/toTableItem";
import { getIsSimpleMode } from "../utils/env";

function Extrinsics() {
  const location = useLocation();
  const dispatch = useDispatch();
  const page = getPageFromQuery(location);
  const pageSize = LIST_DEFAULT_PAGE_SIZE;
  const filters = useExtrinsicFilter();
  const isSimpleMode = getIsSimpleMode();

  const list = useSelector(extrinsicListSelector);
  const loading = useSelector(extrinsicListLoadingSelector);

  useEffect(() => {
    const controller = new AbortController();

    dispatch(
      extrinsicFetchList(
        page - 1,
        pageSize,
        omit(queryString.parse(location.search), ["page", "spec"]),
        { signal: controller.signal },
      ),
    );

    return () => controller.abort();
  }, [dispatch, location, page, pageSize]);

  useEffect(() => {
    return () => {
      dispatch(clearExtrinsicList());
    };
  }, [dispatch]);

  let data = [];
  let head = [];
  if (isSimpleMode) {
    data = toExtrinsicsTabTableItemSimpleMode(list?.items);
    head = extrinsicsHeadSimpleMode;
  } else {
    data = toExtrinsicsTabTableItem(list?.items);
    head = extrinsicsHead;
  }

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Extrinsics" }]} />
      <Filter data={filters} />
      <StyledPanelTableWrapper
        footer={
          <Pagination
            page={parseInt(page)}
            pageSize={pageSize}
            total={list?.total}
          />
        }
      >
        <Table heads={head} data={data} loading={loading} />
      </StyledPanelTableWrapper>
    </Layout>
  );
}

export default Extrinsics;
