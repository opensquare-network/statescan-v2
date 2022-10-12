import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import BreadCrumb from "../components/breadCrumb";
import Layout from "../components/layout";
import Pagination from "../components/pagination";
import { StyledPanelTableWrapper } from "../components/styled/panel";
import api from "../services/api";
import { getPageFromQuery } from "../utils/viewFuncs";
import CallsTable from "../components/call/callsTable";
import { LIST_DEFAULT_PAGE_SIZE } from "../utils/constants";

function Calls() {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [total, setTotal] = useState(0);
  const page = getPageFromQuery(location);
  const pageSize = LIST_DEFAULT_PAGE_SIZE;

  useEffect(() => {
    setData(null);

    api
      .fetch("/calls", {
        page: page - 1,
        pageSize,
      })
      .then(({ result }) => {
        setData(result?.items ?? []);
        setTotal(result?.total ?? 0);
      });
  }, [location, page, pageSize]);

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Calls" }]} />

      <StyledPanelTableWrapper>
        <CallsTable data={data} />
        <Pagination page={parseInt(page)} pageSize={pageSize} total={total} />
      </StyledPanelTableWrapper>
    </Layout>
  );
}

export default Calls;
