import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import BreadCrumb from "../components/breadCrumb";
import Layout from "../components/layout";
import Pagination from "../components/pagination";
import { StyledPanelTableWrapper } from "../components/styled/panel";
import { getPageFromQuery } from "../utils/viewFuncs";
import CallsTable from "../components/call/callsTable";
import { LIST_DEFAULT_PAGE_SIZE } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  callFetchList,
  callListLoadingSelector,
  callListSelector,
  clearCallList,
} from "../store/reducers/callSlice";
import { useCallsFilter } from "../utils/hooks/callsFilter";
import Filter from "../components/filter";
import omit from "lodash.omit";
import * as queryString from "query-string";

function Calls() {
  const location = useLocation();
  const dispatch = useDispatch();
  const page = getPageFromQuery(location);
  const pageSize = LIST_DEFAULT_PAGE_SIZE;
  const filters = useCallsFilter();

  const list = useSelector(callListSelector);
  const loading = useSelector(callListLoadingSelector);

  useEffect(() => {
    const controller = new AbortController();

    dispatch(
      callFetchList(
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
    dispatch(clearCallList());
  }, [dispatch]);

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Calls" }]} />
      <Filter
        title={`All ${list?.total?.toLocaleString?.() ?? ""} calls`}
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
        <CallsTable data={list?.items} loading={loading} />
      </StyledPanelTableWrapper>
    </Layout>
  );
}

export default Calls;
