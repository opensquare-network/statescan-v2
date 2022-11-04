import { StyledPanelTableWrapper } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { useEffect } from "react";
import {
  basicFilters,
  LIST_DEFAULT_PAGE_SIZE,
  transfersHead,
} from "../utils/constants";
import Layout from "../components/layout";
import Table from "../components/table";
import Pagination from "../components/pagination";
import { useLocation } from "react-router-dom";
import { getPageFromQuery } from "../utils/viewFuncs";
import { useDispatch, useSelector } from "react-redux";
import { chainSettingSelector } from "../store/reducers/settingSlice";
import Filter from "../components/filter";
import * as queryString from "query-string";
import {
  transferFetchList,
  transferListLoadingSelector,
  transferListSelector,
} from "../store/reducers/transferSlice";
import TransferTableRow from "../components/transfer/list/row";

function Transfers() {
  const location = useLocation();
  const dispatch = useDispatch();
  const chainSetting = useSelector(chainSettingSelector);
  const page = getPageFromQuery(location);
  const pageSize = LIST_DEFAULT_PAGE_SIZE;

  const list = useSelector(transferListSelector);
  const loading = useSelector(transferListLoadingSelector);

  useEffect(() => {
    const controller = new AbortController();

    dispatch(
      transferFetchList(
        getPageFromQuery(location) - 1,
        pageSize,
        { signed_only: "true", ...queryString.parse(location.search) },
        { signal: controller.signal },
      ),
    );

    return () => controller.abort();
  }, [dispatch, location, pageSize]);

  const data = list?.items?.map((transfer, key) =>
    TransferTableRow(transfer, key, chainSetting),
  );

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Transfers" }]} />
      <Filter
        title={`All ${list?.total?.toLocaleString?.() ?? "gi"} transfers`}
        data={basicFilters}
      />
      <StyledPanelTableWrapper>
        <Table heads={transfersHead} data={data} loading={loading} />
        <Pagination
          page={parseInt(page)}
          pageSize={pageSize}
          total={list?.total}
        />
      </StyledPanelTableWrapper>
    </Layout>
  );
}

export default Transfers;
