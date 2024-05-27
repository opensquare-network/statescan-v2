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
import * as queryString from "query-string";
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
import { addToast } from "../store/reducers/toastSlice";
import ExtrinsicFilter from "../components/extrinsics/filter";

function Extrinsics() {
  const location = useLocation();
  const dispatch = useDispatch();
  const page = getPageFromQuery(location);
  const pageSize = LIST_DEFAULT_PAGE_SIZE;
  const isSimpleMode = getIsSimpleMode();

  const list = useSelector(extrinsicListSelector);
  const loading = useSelector(extrinsicListLoadingSelector);

  useEffect(() => {
    const controller = new AbortController();

    const params = omit(queryString.parse(location.search), ["page", "spec"]);
    if (params.block_start && isNaN(params.block_start)) {
      dispatch(addToast({ type: "error", message: "Invalid block start" }));
      return;
    }
    if (params.block_end && isNaN(params.block_end)) {
      dispatch(addToast({ type: "error", message: "Invalid block end" }));
      return;
    }

    dispatch(
      extrinsicFetchList(page - 1, pageSize, params, {
        signal: controller.signal,
      }),
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
      <ExtrinsicFilter />
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
