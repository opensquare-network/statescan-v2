import { gql } from "@apollo/client";
import { useMultisigQuery } from "../../hooks/apollo";
import { LIST_DEFAULT_PAGE_SIZE, MULTISIG_STATUS } from "../../utils/constants";
import Table from "../table";
import { useQueryParams } from "../../hooks/useQueryParams";
import MultisigLink from "../multisig/link";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Inter_14_500 } from "../../styles/text";
import { StyledPanelTableWrapperNoBordered } from "../styled/panel";
import Pagination from "../pagination";

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
const Status = styled.div`
  ${Inter_14_500};
  color: ${(p) => p.color};
`;

const STATUS_COLORS = {
  [MULTISIG_STATUS.APPROVING]: "var(--theme500)",
  [MULTISIG_STATUS.EXECUTED]: "var(--fontPositive)",
  [MULTISIG_STATUS.CANCELLED]: "var(--fillNegative)",
};

const GET_ACCOUNT_TAB_MULTISIGS = gql`
  query GetAccountTabMultisigs(
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
        indexer {
          blockHeight
          extrinsicIndex
        }
        state {
          name
        }
        threshold
      }
    }
  }
`;

const tableHeads = [
  {
    name: "Extrinsic ID",
    minWidth: 160,
    width: 712,
  },
  {
    name: "Approving",
    width: 160,
  },
  {
    name: "Call",
    width: 240,
  },
  {
    name: "Status",
    width: 200,
  },
];

export default function AccountTabMultisigMultisigs() {
  const { id } = useParams();
  const { page = 1 } = useQueryParams();
  const pageSize = LIST_DEFAULT_PAGE_SIZE;

  const { data, loading } = useMultisigQuery(GET_ACCOUNT_TAB_MULTISIGS, {
    variables: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
      account: id,
    },
  });

  const tableData = data?.multisigs?.multisigs?.map?.((multisig) => {
    return [
      <MultisigLink indexer={multisig?.indexer} address={multisig?.address} />,
      <ApprovingText>
        {multisig.approvals?.length}
        <ApprovingSlashText>/</ApprovingSlashText>
        <ApprovingCountText>{multisig.threshold}</ApprovingCountText>
      </ApprovingText>,
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
    <StyledPanelTableWrapperNoBordered
      footer={
        <Pagination
          page={page}
          pageSize={pageSize}
          total={data?.multisigs?.total}
        />
      }
    >
      <Table heads={tableHeads} data={tableData} loading={loading} />
    </StyledPanelTableWrapperNoBordered>
  );
}
