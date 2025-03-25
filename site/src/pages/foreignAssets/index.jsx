import { StyledPanelTableWrapper } from "../../components/styled/panel";
import BreadCrumb from "../../components/breadCrumb";
import React, { useState } from "react";
import {
  foreignAssetsHead,
  LIST_DEFAULT_PAGE_SIZE,
} from "../../utils/constants";
import Layout from "../../components/layout";
import Table from "../../components/table";
import Pagination from "../../components/pagination";
import useForeignAssetsTableData from "../../utils/hooks/useForeignAssetsTableData";
import { useQueryParams } from "../../hooks/useQueryParams";
import { useQuery } from "@apollo/client";
import { GET_FOREIGN_ASSETS_LIST } from "../../services/gql/foreignAssets";

function ForeignAssets() {
  const { page = 1 } = useQueryParams();
  const pageSize = LIST_DEFAULT_PAGE_SIZE;
  const [data, setData] = useState();

  const { loading } = useQuery(GET_FOREIGN_ASSETS_LIST, {
    variables: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
    },
    onCompleted: setData,
  });
  const tableData = useForeignAssetsTableData(data?.foreignAssets?.assets);

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Foreign Assets" }]} />
      <StyledPanelTableWrapper
        footer={
          <Pagination
            page={parseInt(page)}
            pageSize={pageSize}
            total={data?.foreignAssets?.total}
          />
        }
      >
        <Table heads={foreignAssetsHead} data={tableData} loading={loading} />
      </StyledPanelTableWrapper>
    </Layout>
  );
}

export default ForeignAssets;
