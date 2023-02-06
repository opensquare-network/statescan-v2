import { StyledPanelTableWrapper } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { useEffect } from "react";
import { LIST_DEFAULT_PAGE_SIZE, transfersHead } from "../utils/constants";
import Layout from "../components/layout";
import Table from "../components/table";
import Pagination from "../components/pagination";
import { useLocation } from "react-router-dom";
import { getPageFromQuery } from "../utils/viewFuncs";
import { useDispatch, useSelector } from "react-redux";
import { chainSettingSelector } from "../store/reducers/settingSlice";
import * as queryString from "query-string";
import {
  transferFetchList,
  transferListLoadingSelector,
  transferListSelector,
} from "../store/reducers/transferSlice";
import TransferTableRow from "../components/transfer/list/row";
import omit from "lodash.omit";
import { useTransfersFilter } from "../utils/hooks/transfersFilter";
import Filter from "../components/filter";

function Transfers() {
  const location = useLocation();
  const dispatch = useDispatch();
  const chainSetting = useSelector(chainSettingSelector);
  const page = getPageFromQuery(location);
  const pageSize = LIST_DEFAULT_PAGE_SIZE;
  const filters = useTransfersFilter();

  const list = useSelector(transferListSelector);
  const loading = useSelector(transferListLoadingSelector);

  useEffect(() => {
    const controller = new AbortController();

    dispatch(
      transferFetchList(
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

  const data = list?.items?.map((transfer, key) =>
    TransferTableRow(transfer, key, chainSetting),
  );

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Transfers" }]} />
      <Filter
        title={`All ${list?.total?.toLocaleString?.() ?? ""} transfers`}
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
        <Table heads={transfersHead} data={data} loading={loading} />
      </StyledPanelTableWrapper>
    </Layout>
  );
}

export default Transfers;
