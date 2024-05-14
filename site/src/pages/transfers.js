import { StyledPanelTableWrapper } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import { useEffect } from "react";
import { LIST_DEFAULT_PAGE_SIZE } from "../utils/constants";
import Layout from "../components/layout";
import Pagination from "../components/pagination";
import { useLocation } from "react-router-dom";
import { getPageFromQuery } from "../utils/viewFuncs";
import { useDispatch, useSelector } from "react-redux";
import * as queryString from "query-string";
import {
  transferFetchList,
  transferListLoadingSelector,
  transferListSelector,
} from "../store/reducers/transferSlice";
import omit from "lodash.omit";
import { useTransfersFilter } from "../utils/hooks/transfersFilter";
import Filter from "../components/filter";
import TransfersTable from "../components/transfer/table";

function Transfers() {
  const location = useLocation();
  const dispatch = useDispatch();
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

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Transfers" }]} />
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
        <TransfersTable data={list?.items} loading={loading} />
      </StyledPanelTableWrapper>
    </Layout>
  );
}

export default Transfers;
