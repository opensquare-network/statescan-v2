import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import BreadCrumb from "../components/breadCrumb";
import Layout from "../components/layout";
import { StyledPanelTableWrapper } from "../components/styled/panel";
import Table from "../components/table";
import { identitiesHead } from "../utils/constants";

const GET_IDENTITIES = gql`
  query GetIdentities {
    identity(account: "Fom9M5W6Kck1hNAiE2mDcZ67auUCiNTzLBUdQy4QnxHSxdn") {
      account
      isSub
      subs
    }
  }
`;

export default function IdentitiesPage() {
  const [data, setData] = useState(null);

  const { loading } = useQuery(GET_IDENTITIES, {
    onCompleted(data) {
      setData(data);
    },
  });

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
