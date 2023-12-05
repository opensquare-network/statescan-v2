import { gql } from "@apollo/client";
import { parseInt } from "lodash";
import { useState } from "react";
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
import { time } from "../utils/viewFuncs/time";
import toUpper from "lodash.toupper";
import { useIdentityQuery } from "../hooks/apollo";

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

const GET_REQUESTS = gql`
  query GetRequests(
    $limit: Int!
    $offset: Int!
    $registrarIndex: Int
    $search: String
    $status: RequestStatusValue
    $sort: RequestSort
  ) {
    requests(
      limit: $limit
      offset: $offset
      registrarIndex: $registrarIndex
      search: $search
      status: $status
      sort: $sort
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
        isFinal
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
  const pageSize = LIST_DEFAULT_PAGE_SIZE;
  const { page = 1, search, registrarIndex, status, sort } = useQueryParams();
  const filter = useRequestsFilter();
  const [data, setData] = useState(null);

  const { loading } = useIdentityQuery(GET_REQUESTS, {
    variables: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
      registrarIndex: parseInt(registrarIndex),
      search,
      status: status ? toUpper(status) : null,
      sort,
    },
    onCompleted(data) {
      setData(data);
    },
  });

  const tableData = data?.requests.requests.map((item) => {
    return [
      <AddressOrIdentity
        key={item.account}
        address={item.account}
        linkToIdentityTimeline
      />,
      <Flex gap={24}>
        <Index>#{item.registrarIndex}</Index>
        <AddressOrIdentity address={item.registrar} />
      </Flex>,
      <Time>{time(Number(item.indexer.blockTime))}</Time>,
      <Time>
        {item.isFinal ? time(Number(item.status.indexer.blockTime)) : "--"}
      </Time>,
      <Status color={STATUS_COLORS[item.status.name]}>
        {item.status.name}
      </Status>,
    ];
  });

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Judgement Requests" }]} />

      <Filter data={filter} filterOnDataChange />

      <StyledPanelTableWrapper
        footer={
          <Pagination
            page={parseInt(page)}
            pageSize={pageSize}
            total={data?.requests.total}
          />
        }
      >
        <Table
          heads={requestsHead}
          data={tableData}
          loading={loading}
          onSortChange={() => {}}
        />
      </StyledPanelTableWrapper>
    </Layout>
  );
}
