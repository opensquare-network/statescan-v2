import { gql, useQuery } from "@apollo/client";
import BreadCrumb from "../components/breadCrumb";
import Layout from "../components/layout";
import { StyledPanelTableWrapper } from "../components/styled/panel";
import Table from "../components/table";
import { identitiesHead } from "../utils/constants";

const GET_IDENTITIES = gql``;

export default function IdentitiesPage() {
  const { data, loading } = useQuery(GET_IDENTITIES);

  const tableData = data?.identities.map((item) => {});

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Identities" }]} />

      <StyledPanelTableWrapper>
        <Table heads={identitiesHead} data={tableData} loading={loading} />
      </StyledPanelTableWrapper>
    </Layout>
  );
}
