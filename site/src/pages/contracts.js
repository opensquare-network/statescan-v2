import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../components/breadCrumb";
import Layout from "../components/layout";
import Pagination from "../components/pagination";
import Table from "../components/table";
import { StyledPanelTableWrapper } from "../components/styled/panel";
import { getPageFromQuery } from "../utils/viewFuncs";
import { contractsHead, LIST_DEFAULT_PAGE_SIZE } from "../utils/constants";
import { toContractsTableItem } from "../utils/viewFuncs/toTableItem";
import {
  clearContractList,
  contractFetchList,
  contractListLoadingSelector,
  contractListSelector,
} from "../store/reducers/contractSlice";

function Contracts() {
  const location = useLocation();
  const dispatch = useDispatch();
  const page = getPageFromQuery(location);
  const pageSize = LIST_DEFAULT_PAGE_SIZE;

  const list = useSelector(contractListSelector);
  const loading = useSelector(contractListLoadingSelector);

  useEffect(() => {
    const controller = new AbortController();

    dispatch(
      contractFetchList(page - 1, pageSize, {
        signal: controller.signal,
      }),
    );

    return () => controller.abort();
  }, [dispatch, page, pageSize]);

  useEffect(() => {
    return () => {
      dispatch(clearContractList());
    };
  }, [dispatch]);

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Contracts" }]} />
      <StyledPanelTableWrapper
        footer={
          <Pagination page={page} pageSize={pageSize} total={list?.total} />
        }
      >
        <Table
          heads={contractsHead}
          data={toContractsTableItem(list?.items)}
          loading={loading}
        />
      </StyledPanelTableWrapper>
    </Layout>
  );
}

export default Contracts;
