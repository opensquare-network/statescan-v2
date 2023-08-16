import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import styled from "styled-components";
import AddressOrIdentity, { Address } from "../components/address";
import BreadCrumb from "../components/breadCrumb";
import Filter from "../components/filter";
import Layout from "../components/layout";
import Pagination from "../components/pagination";
import { Flex } from "../components/styled/flex";
import { StyledPanelTableWrapper } from "../components/styled/panel";
import Table from "../components/table";
import { useQueryParams } from "../hooks/useQueryParams";
import { Inter_14_500, Overpass_Mono_14_500 } from "../styles/text";
import { identitiesHead, LIST_DEFAULT_PAGE_SIZE } from "../utils/constants";
import { useIdentitiesFilter } from "../utils/hooks/useIdentitiesFilter";
import { time } from "../utils/viewFuncs/time";

const SubIdentityNameWrapper = styled(Flex)`
  position: relative;
  top: -0.5px;
  gap: 8px;
  color: var(--fontSecondary);
  ${Overpass_Mono_14_500};
`;

const Time = styled.div`
  ${Inter_14_500};
  color: var(--fontTertiary);
`;

const GET_IDENTITIES = gql`
  query GetIdentity($limit: Int!, $offset: Int!, $search: String) {
    identities(limit: $limit, offset: $offset, search: $search) {
      limit
      offset
      total
      identities {
        subsCount
        account
        isSub
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
    },
    onCompleted(data) {
      setData(data);
    },
  });

  const tableData = data?.identities?.identities?.map?.((item) => {
    return [
      <Flex gap={8}>
        <AddressOrIdentity address={item.account} />

        {filterData.showSubIdentity && item?.isSub && (
          <SubIdentityNameWrapper>
            <div></div>
          </SubIdentityNameWrapper>
        )}
      </Flex>,
      <Address address={item.account} />,
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
