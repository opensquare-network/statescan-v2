import { useQuery } from "@apollo/client";
import { parseInt } from "lodash";
import BreadCrumb from "../../components/breadCrumb";
import Layout from "../../components/layout";
import Pagination from "../../components/pagination";
import { StyledPanelTableWrapper } from "../../components/styled/panel";
import Table from "../../components/table";
import { useQueryParams } from "../../hooks/useQueryParams";
import { GET_ASSETS_LIST } from "../../services/gql/assets";
import {
  destroyedAssetsHead,
  LIST_DEFAULT_PAGE_SIZE,
} from "../../utils/constants";
import { useDestroyedAssetsTableData } from "../../utils/hooks/useAssetsTableData";
import { useState } from "react";

export default function DestroyedAssets() {
  const { page = 1 } = useQueryParams();
  const pageSize = LIST_DEFAULT_PAGE_SIZE;
  const [data, setData] = useState();

  const { loading } = useQuery(GET_ASSETS_LIST, {
    variables: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
      destroyed: true,
    },
    onCompleted: setData,
  });
  const tableData = useDestroyedAssetsTableData(data?.assets?.assets);

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Destroyed Assets" }]} />
      <StyledPanelTableWrapper
        footer={
          <Pagination
            page={parseInt(page)}
            pageSize={pageSize}
            total={data?.assets?.total}
          />
        }
      >
        <Table heads={destroyedAssetsHead} data={tableData} loading={loading} />
      </StyledPanelTableWrapper>
    </Layout>
  );
}
