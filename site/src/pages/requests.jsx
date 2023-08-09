import { gql, useQuery } from "@apollo/client";
import { parseInt } from "lodash";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import AddressOrIdentity from "../components/address";
import BreadCrumb from "../components/breadCrumb";
import Layout from "../components/layout";
import Pagination from "../components/pagination";
import { Flex } from "../components/styled/flex";
import { StyledPanelTableWrapper } from "../components/styled/panel";
import Table from "../components/table";
import { Inter_14_500, Overpass_Mono_14_500 } from "../styles/text";
import { LIST_DEFAULT_PAGE_SIZE, requestsHead } from "../utils/constants";
import { getPageFromQuery } from "../utils/viewFuncs";
import { time } from "../utils/viewFuncs/time";

const Index = styled.div`
  ${Overpass_Mono_14_500};
  color: ${(p) => p.theme.fontSecondary};
`;

const StatusColorMap = {
  pending: "var(--fillPending)",
  removed: "var(--fontSecondary)",
  cancelled: "var(--fillNegative)",
  given: "var(--fillPositive)",
};
const Status = styled.div`
  ${Inter_14_500};
  color: ${(p) => p.color};
  text-transform: capitalize;
`;

const GET_REQUESTS = gql`
  query GetRequests($limit: Int!, $offset: Int!) {
    requests(limit: $limit, offset: $offset) {
      limit
      offset
      total
      requests {
        status {
          name
          indexer {
            blockTime
            blockHeight
          }
        }
        registrar
        registrarIndex
        account
        indexer {
          blockTime
          blockHeight
        }
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
      <Flex gap={24}>
        <Index>#{item.registrarIndex}</Index>
        <AddressOrIdentity address={item.registrar} />
      </Flex>,
      // FIXME: requests, time
      time(Number(item.indexer.blockTime)),
      time(Number(item.status.indexer.blockTime)),
      <Status color={StatusColorMap[item.status.name]}>
        {item.status.name}
      </Status>,
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
