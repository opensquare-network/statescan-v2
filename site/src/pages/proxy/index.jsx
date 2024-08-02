import { useState } from "react";
import BreadCrumb from "../../components/breadCrumb";
import Layout from "../../components/layout";
import Pagination from "../../components/pagination";
import { StyledPanelTableWrapper } from "../../components/styled/panel";
import { useQueryParams } from "../../hooks/useQueryParams";
import { LIST_DEFAULT_PAGE_SIZE } from "../../utils/constants";
import { useProxyQuery } from "../../hooks/apollo";
import { gql } from "@apollo/client";
import ProxyTable from "../../components/proxy/table";

const GET_PROXIES = gql`
  query MyQuery($limit: Int!, $offset: Int!) {
    proxies(limit: $limit, offset: $offset) {
      items {
        delegatee
        delegator
        delay
        type
        isRemoved
        indexer {
          blockTime
          blockHeight
        }
        proxyId
        isPure
      }
      total
      offset
      limit
    }
  }
`;

export default function ProxyPage() {
  const { page = 1 } = useQueryParams();
  const pageSize = LIST_DEFAULT_PAGE_SIZE;
  const [data, setData] = useState();

  const { loading } = useProxyQuery(GET_PROXIES, {
    variables: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
    },
    onCompleted: setData,
  });

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Proxy" }]} />

      <StyledPanelTableWrapper
        footer={
          <Pagination
            page={page}
            pageSize={pageSize}
            total={data?.proxies?.total}
          />
        }
      >
        <ProxyTable loading={loading} data={data?.proxies?.items} />
      </StyledPanelTableWrapper>
    </Layout>
  );
}
