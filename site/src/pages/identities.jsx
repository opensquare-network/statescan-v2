import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import styled from "styled-components";
import AddressOrIdentity, { Address } from "../components/address";
import BreadCrumb from "../components/breadCrumb";
import Filter from "../components/filter";
import Layout from "../components/layout";
import Pagination from "../components/pagination";
import { StyledPanelTableWrapper } from "../components/styled/panel";
import Table from "../components/table";
import Tooltip from "../components/tooltip";
import { useQueryParams } from "../hooks/useQueryParams";
import { Inter_14_500 } from "../styles/text";
import { identitiesHead, LIST_DEFAULT_PAGE_SIZE } from "../utils/constants";
import { useIdentitiesFilter } from "../utils/hooks/useIdentitiesFilter";
import { time } from "../utils/viewFuncs/time";

const Time = styled.div`
  ${Inter_14_500};
  color: var(--fontTertiary);
`;

const GET_IDENTITIES = gql`
  query GetIdentities(
    $limit: Int!
    $offset: Int!
    $search: String
    $includeSubIdentities: Boolean
  ) {
    identities(
      limit: $limit
      offset: $offset
      search: $search
      includeSubIdentities: $includeSubIdentities
    ) {
      limit
      offset
      total
      identities {
        subsCount
        account
        lastUpdate {
          blockTime
        }
      }
    }
  }
`;

export default function IdentitiesPage() {
  const [data, setData] = useState(null);
  const filter = useIdentitiesFilter();
  const [filterData, setFilterData] = useState({});
  const { page = 1, search = "" } = useQueryParams();
  const pageSize = LIST_DEFAULT_PAGE_SIZE;

  const { loading } = useQuery(GET_IDENTITIES, {
    variables: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
      search,
      includeSubIdentities: !!filterData.includeSubIdentities,
    },
    onCompleted(data) {
      setData(data);
    },
  });

  const tableData = data?.identities?.identities?.map?.((item) => {
    return [
      <AddressOrIdentity address={item.account} linkToTimelineIdentityPage />,
      <Tooltip tip={item.account}>
        <Address address={item.account} />
      </Tooltip>,
      item?.subsCount,
      <Time>{time(item?.lastUpdate?.blockTime)}</Time>,
    ];
  });

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Identities" }]} />

      <Filter
        data={filter}
        showFilterButton={false}
        filterOnDataChange
        onDataChange={setFilterData}
      />

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
