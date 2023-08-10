import { gql, useQuery } from "@apollo/client";
import { parseInt } from "lodash";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import AddressOrIdentity from "../components/address";
import BreadCrumb from "../components/breadCrumb";
import Filter from "../components/filter";
import Layout from "../components/layout";
import Pagination from "../components/pagination";
import { Flex } from "../components/styled/flex";
import { StyledPanelTableWrapper } from "../components/styled/panel";
import Table from "../components/table";
import { useQueryParams } from "../hooks/useQueryParams";
import { Inter_14_500, Overpass_Mono_14_500 } from "../styles/text";
import {
  LIST_DEFAULT_PAGE_SIZE,
  requestsHead,
  REQUEST_STATUS,
} from "../utils/constants";
import { useRequestsFilter } from "../utils/hooks/useRequestsFilter";
import { getPageFromQuery } from "../utils/viewFuncs";
import { time } from "../utils/viewFuncs/time";

const Index = styled.div`
  ${Overpass_Mono_14_500};
  color: ${(p) => p.theme.fontSecondary};
`;

const Time = styled.div`
  ${Inter_14_500};
  color: var(--fontTertiary);
`;

const STATUS_COLORS = {
  [REQUEST_STATUS.PENDING]: "var(--fillPending)",
  [REQUEST_STATUS.REMOVED]: "var(--fontSecondary)",
  [REQUEST_STATUS.CANCELLED]: "var(--fillNegative)",
  [REQUEST_STATUS.GIVEN]: "var(--fillPositive)",
};
const Status = styled.div`
  ${Inter_14_500};
  color: ${(p) => p.color};
  text-transform: capitalize;
`;

// FIXME: requests, status
const GET_REQUESTS = gql`
  query GetRequests(
    $limit: Int!
    $offset: Int!
    $registrarIndex: Int
    $account: String
  ) {
    requests(
      limit: $limit
      offset: $offset
      registrarIndex: $registrarIndex
      account: $account
    ) {
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
  const { account, registrarIndex } = useQueryParams();
  const filter = useRequestsFilter();
  const [data, setData] = useState(null);

  const { loading } = useQuery(GET_REQUESTS, {
    variables: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
      registrarIndex: parseInt(registrarIndex),
      account,
    },
    onCompleted(data) {
      setData(data);
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
      <Time>{time(Number(item.indexer.blockTime))}</Time>,
      <Time>{time(Number(item.status.indexer.blockTime))}</Time>,
      <Status color={STATUS_COLORS[item.status.name]}>
        {item.status.name}
      </Status>,
    ];
  });

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Requests" }]} />

      <Filter data={filter} />

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
