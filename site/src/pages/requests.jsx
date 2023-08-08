import { gql, useQuery } from "@apollo/client";
import { parseInt } from "lodash";
import { useLocation } from "react-router-dom";
import AddressOrIdentity from "../components/address";
import BreadCrumb from "../components/breadCrumb";
import Layout from "../components/layout";
import Pagination from "../components/pagination";
import { StyledPanelTableWrapper } from "../components/styled/panel";
import Table from "../components/table";
import { LIST_DEFAULT_PAGE_SIZE, requestsHead } from "../utils/constants";
import { getPageFromQuery } from "../utils/viewFuncs";

const GET_REQUESTS = gql`
  query GetRequests($limit: Int!, $offset: Int!) {
    requests(limit: $limit, offset: $offset) {
      total
      limit
      offset
      requests {
        registrar
        status {
          name
        }
        account
      }
    }
  }
`;

export default function RequestsPage() {
  const location = useLocation();
  const page = getPageFromQuery(location);
  const pageSize = LIST_DEFAULT_PAGE_SIZE;

  const { data, loading } = useQuery(GET_REQUESTS, {
    variables: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
    },
  });

  const tableData = data?.requests.requests.map((item) => {
    return [
      <AddressOrIdentity address={item.account} />,
      <AddressOrIdentity address={item.registrar} />,
    ];
  });

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Requests" }]} />

      <StyledPanelTableWrapper
        footer={
          <Pagination
            page={parseInt(page)}
            pageSize={pageSize}
            total={data?.requests.total}
          />
        }
      >
        <Table heads={requestsHead} data={tableData} loading={loading} />
      </StyledPanelTableWrapper>
    </Layout>
  );
}
