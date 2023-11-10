import { gql } from "@apollo/client";
import BreadCrumb from "../components/breadCrumb";
import Layout from "../components/layout";
import { useQueryParams } from "../hooks/useQueryParams";
import {
  LIST_DEFAULT_PAGE_SIZE,
  MULTISIG_STATUS,
  multisigsHead,
} from "../utils/constants";
import { StyledPanelTableWrapper } from "../components/styled/panel";
import Table from "../components/table";
import Pagination from "../components/pagination";
import styled from "styled-components";
import { Inter_14_500 } from "../styles/text";
import AddressOrIdentity from "../components/address";
import { useMultisigQuery } from "../hooks/apollo";
import { Flex } from "../components/styled/flex";
import { useMultisigsFilter } from "../hooks/filter/useMultisigsFilter";
import Filter from "../components/filter";
import MultisigLink from "../components/multisig/link";
import Tooltip from "../components/tooltip";
import { ColoredMonoLink } from "../components/styled/link";
import { hashEllipsis } from "../utils/viewFuncs/text";

const ApprovingText = styled.div`
  ${Inter_14_500};
  color: var(--fontPrimary);
`;
const ApprovingSlashText = styled.span`
  color: var(--fontTertiary);
  margin: 0 2px;
`;
const ApprovingCountText = styled.span`
  color: var(--fontSecondary);
`;

const STATUS_COLORS = {
  [MULTISIG_STATUS.APPROVING]: "var(--theme500)",
  [MULTISIG_STATUS.EXECUTED]: "var(--fontPositive)",
  [MULTISIG_STATUS.CANCELLED]: "var(--fillNegative)",
};
const Status = styled.div`
  ${Inter_14_500};
  color: ${(p) => p.color};
`;

const GET_MULTISIGS = gql`
  query GetMultisigs(
    $limit: Int!
    $offset: Int!
    $multisigState: MultisigState
    $account: String
  ) {
    multisigs(
      limit: $limit
      offset: $offset
      multisigState: $multisigState
      account: $account
    ) {
      limit
      offset
      total
      multisigs {
        address
        approvals
        call
        callHash
        indexer {
          blockTime
          blockHeight
          extrinsicIndex
        }
        state {
          name
        }
        signatoriesCount
        threshold
      }
    }
  }
`;

export default function MultisigsPage() {
  const { page = 1, account = "", status } = useQueryParams();
  const filter = useMultisigsFilter();
  const pageSize = LIST_DEFAULT_PAGE_SIZE;
  const { data, loading } = useMultisigQuery(GET_MULTISIGS, {
    variables: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
      account,
      multisigState: status ? status.toUpperCase() : null,
    },
  });

  const tableData = data?.multisigs?.multisigs?.map?.((multisig) => {
    return [
      <MultisigLink indexer={multisig?.indexer} address={multisig?.address} />,
      <Flex>
        <AddressOrIdentity address={multisig.address} />
      </Flex>,
      <ApprovingText>
        {multisig.approvals?.length}
        <ApprovingSlashText>/</ApprovingSlashText>
        <ApprovingCountText>{multisig.threshold}</ApprovingCountText>
      </ApprovingText>,
      <ApprovingText>{multisig.signatoriesCount}</ApprovingText>,
      <Tooltip tip={multisig.callHash}>
        <ColoredMonoLink
          to={`/multisigs/${multisig?.indexer?.blockHeight}-${multisig?.indexer?.extrinsicIndex}-${multisig?.address}`}
        >
          {hashEllipsis(multisig.callHash, 2, 4)}
        </ColoredMonoLink>
      </Tooltip>,
      <span
        style={{
          wordBreak: "break-word",
        }}
      >
        {multisig?.call
          ? `${multisig.call.section}(${multisig.call.method})`
          : "--"}
      </span>,
      <Status color={STATUS_COLORS[multisig?.state?.name?.toUpperCase?.()]}>
        {multisig?.state?.name}
      </Status>,
    ];
  });

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Multisigs" }]} />

      <Filter data={filter} filterOnDataChange />

      <StyledPanelTableWrapper
        footer={
          <Pagination
            page={page}
            pageSize={pageSize}
            total={data?.multisigs?.total}
          />
        }
      >
        <Table heads={multisigsHead} data={tableData} loading={loading} />
      </StyledPanelTableWrapper>
    </Layout>
  );
}