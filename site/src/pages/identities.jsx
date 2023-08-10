import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import BreadCrumb from "../components/breadCrumb";
import Layout from "../components/layout";
import { StyledPanelTableWrapper } from "../components/styled/panel";
import Table from "../components/table";
import { identitiesHead } from "../utils/constants";

// TODO: identities query
/* const GET_IDENTITIES = gql`
  query GetIdentities {
  }
`; */

export default function IdentitiesPage() {
  const [data, setData] = useState(null);

  const loading = false;
  /* const { loading } = useQuery(GET_IDENTITIES, {
    onCompleted(data) {
      setData(data);
    },
  }); */

  const tableData = data?.identity;

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Identities" }]} />

      <StyledPanelTableWrapper>
        <Table heads={identitiesHead} data={tableData} loading={loading} />
      </StyledPanelTableWrapper>
    </Layout>
  );
}
