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

function Calls() {
  const location = useLocation();
  const dispatch = useDispatch();
  const page = getPageFromQuery(location);
  const pageSize = LIST_DEFAULT_PAGE_SIZE;

  const list = useSelector(callListSelector);
  const loading = useSelector(callListLoadingSelector);

  useEffect(() => {
    const controller = new AbortController();

    dispatch(
      callFetchList(page - 1, pageSize, null, { signal: controller.signal }),
    );

    return () => controller.abort();
  }, [dispatch, page, pageSize]);

  useEffect(() => {
    dispatch(clearCallList());
  }, [dispatch]);

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Calls" }]} />

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
