import { gql } from "@apollo/client";
import BreadCrumb from "../components/breadCrumb";
import Layout from "../components/layout";
import Pagination from "../components/pagination";
import { StyledPanelTableWrapper } from "../components/styled/panel";
import Table from "../components/table";
import {
  LIST_DEFAULT_PAGE_SIZE,
  MULTISIG_ACCOUNT_SORT,
  multisigAccountsHead,
} from "../utils/constants";
import { useMultisigQuery } from "../hooks/apollo";
import { useQueryParams } from "../hooks/useQueryParams";
import { Flex } from "../components/styled/flex";
import AddressOrIdentity from "../components/address";
import styled from "styled-components";
import { Inter_14_500 } from "../styles/text";
import { time } from "../utils/viewFuncs/time";
import { useState } from "react";
import Tooltip from "../components/tooltip";

const Text = styled.div`
  ${Inter_14_500};
  color: var(--fontPrimary);
`;

const Time = styled.div`
  ${Inter_14_500};
  color: var(--fontTertiary);
`;

const SignatoriesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  * {
    color: var(--textPrimary);
    white-space: nowrap;
  }
`;

const GET_MULTISIG_ADDRESSES = gql`
  query GetMultisigAddresses(
    $limit: Int!
    $offset: Int!
    $sort: MultisigAddressSort
  ) {
    multisigAddresses(limit: $limit, offset: $offset, sort: $sort) {
      limit
      offset
      total
      multisigAddresses {
        address
        latestMultisigAt {
          blockTime
        }
        debutAt {
          blockTime
        }
        signatories
        threshold
      }
    }
  }
`;

export default function MultisigAccountsPage() {
  const pageSize = LIST_DEFAULT_PAGE_SIZE;
  const { page = 1, sort } = useQueryParams();
  const [data, setData] = useState(null);
  const { loading } = useMultisigQuery(GET_MULTISIG_ADDRESSES, {
    variables: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
      sort: sort
        ? sort?.toUpperCase?.()
        : MULTISIG_ACCOUNT_SORT.DEBUT_AT_HEIGHT_DESC,
    },
    onCompleted: setData,
  });

  const tableData = data?.multisigAddresses?.multisigAddresses?.map?.(
    (multisigAddress) => {
      return [
        <Flex>
          <AddressOrIdentity
            key={multisigAddress.address}
            address={multisigAddress.address}
          />
        </Flex>,
        <Text>{multisigAddress.threshold}</Text>,
        <Tooltip
          tip={
            <SignatoriesWrapper>
              {multisigAddress.signatories?.map?.((signatory) => (
                <AddressOrIdentity
                  key={signatory}
                  ellipsis={false}
                  address={signatory}
                />
              ))}
            </SignatoriesWrapper>
          }
        >
          <Text>{multisigAddress.signatories?.length}</Text>
        </Tooltip>,
        <Time>{time(multisigAddress.debutAt.blockTime)}</Time>,
        <Time>{time(multisigAddress.latestMultisigAt.blockTime)}</Time>,
      ];
    },
  );

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Multisig Accounts" }]} />

      <StyledPanelTableWrapper
        footer={
          <Pagination
            page={page}
            pageSize={pageSize}
            total={data?.multisigAddresses?.total}
          />
        }
      >
        <Table
          heads={multisigAccountsHead}
          data={tableData}
          loading={loading}
        />
      </StyledPanelTableWrapper>
    </Layout>
  );
}
