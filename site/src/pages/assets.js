import { StyledPanelTableWrapper } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React from "react";
import { assetsHead, LIST_DEFAULT_PAGE_SIZE } from "../utils/constants";
import Layout from "../components/layout";
import Table from "../components/table";
import Pagination from "../components/pagination";
import { useAssetsTableData } from "../utils/hooks/useAssetsTableData";
import { useQueryParams } from "../hooks/useQueryParams";
import { useQuery } from "@apollo/client";
import { ASSETS_LIST } from "../services/gql/assets";

function Assets() {
  const { page = 1 } = useQueryParams();
  const pageSize = LIST_DEFAULT_PAGE_SIZE;

  const { data, loading } = useQuery(ASSETS_LIST, {
    variables: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
    },
  });
  const tableData = useAssetsTableData(data?.assets?.assets);

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Assets" }]} />
      <StyledPanelTableWrapper
        footer={
          <Pagination
            page={parseInt(page)}
            pageSize={pageSize}
            total={data?.assets?.total}
          />
        }
      >
        <Table heads={assetsHead} data={tableData} loading={loading} />
      </StyledPanelTableWrapper>
    </Layout>
  );
}

export default Assets;
