import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import BreadCrumb from "../components/breadCrumb";
import Filter from "../components/filter";
import Layout from "../components/layout";
import Pagination from "../components/pagination";
import { StyledPanelTableWrapper } from "../components/styled/panel";
import Table from "../components/table";
import { useQueryParams } from "../hooks/useQueryParams";
import { identitiesHead, LIST_DEFAULT_PAGE_SIZE } from "../utils/constants";
import { useIdentitiesFilter } from "../utils/hooks/identitiesFilter";

// FIXME: identities query
const GET_IDENTITIES = gql`
  query GetIdentity($account: String!) {
    identity(account: $account) {
      account
    }
  }
`;

export default function IdentitiesPage() {
  const [data, setData] = useState(null);
  const filter = useIdentitiesFilter();
  const { page = 1, showSubIdentity = false, account = "" } = useQueryParams();
  const pageSize = LIST_DEFAULT_PAGE_SIZE;

  const { loading } = useQuery(GET_IDENTITIES, {
    variables: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
      showSubIdentity,
      account,
    },
    onCompleted(data) {
      setData(data);
    },
  });

  const tableData = data?.identities ?? [];

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Identities" }]} />

      <Filter data={filter} showFilterButton={false} filterOnDataChange />

      <StyledPanelTableWrapper
        footer={
          <Pagination
            page={page}
            pageSize={pageSize}
            total={data?.identities?.total}
          />
        }
      >
        <Table heads={identitiesHead} data={tableData} loading={loading} />
      </StyledPanelTableWrapper>
    </Layout>
  );
}
