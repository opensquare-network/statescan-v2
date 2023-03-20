import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import BreadCrumb from "../components/breadCrumb";
import Layout from "../components/layout";
import Pagination from "../components/pagination";
import RuntimesTable from "../components/runtime/runtimesTable";
import { StyledPanelTableWrapper } from "../components/styled/panel";
import {
  clearRuntimeList,
  runtimeFetchList,
  runtimeListLoadingSelector,
  runtimeListSelector,
} from "../store/reducers/runtimeSlice";
import { LIST_DEFAULT_PAGE_SIZE } from "../utils/constants";
import { getPageFromQuery } from "../utils/viewFuncs";

export default function Runtimes() {
  const dispatch = useDispatch();
  const location = useLocation();
  const page = getPageFromQuery(location);
  const pageSize = LIST_DEFAULT_PAGE_SIZE;

  const list = useSelector(runtimeListSelector);
  const loading = useSelector(runtimeListLoadingSelector);

  useEffect(() => {
    const controller = new AbortController();

    dispatch(
      runtimeFetchList(page - 1, pageSize, null, { signal: controller.signal }),
    );

    return () => {
      controller.abort();
    };
  }, [dispatch, page, pageSize]);

  useEffect(() => {
    return () => {
      dispatch(clearRuntimeList());
    };
  }, [dispatch]);

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Runtimes" }]} />

      <StyledPanelTableWrapper
        footer={
          <Pagination
            page={parseInt(page)}
            pageSize={pageSize}
            total={list?.total}
          />
        }
      >
        <RuntimesTable data={list?.items} loading={loading} />
      </StyledPanelTableWrapper>
    </Layout>
  );
}
