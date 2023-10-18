import { gql } from "@apollo/client";
import Table from "../table";
import { accountSubIdentitiesHead } from "../../utils/constants";
import AddressOrIdentity from "../address";
import styled from "styled-components";
import { Inter_14_500, Overpass_Mono_14_500 } from "../../styles/text";
import { StyledPanelTableWrapper } from "../styled/panel";
import { useIdentityQuery } from "../../hooks/useApollo";

const TableWrapper = styled(StyledPanelTableWrapper)`
  border-radius: 0;
  box-shadow: none;
  border: 0;
`;

const Name = styled.div`
  ${Inter_14_500};
  color: var(--fontPrimary);
`;

const Address = styled.div`
  ${Overpass_Mono_14_500};
  color: var(--theme500);
`;

const GET_SUB_IDENTITIES = gql`
  query GetSubIdentities($account: String!) {
    identity(account: $account) {
      subs {
        account
        name
      }
    }
  }
`;

export default function AccountSubIdentities({ account = "" }) {
  const { data, loading } = useIdentityQuery(GET_SUB_IDENTITIES, {
    variables: { account },
  });

  const tableData = data?.identity?.subs?.map((sub) => {
    return [
      <AddressOrIdentity address={sub.account} />,
      <Name>{sub.name}</Name>,
      <Address>{sub.account}</Address>,
    ];
  });

  return (
    <TableWrapper>
      <Table
        loading={loading}
        heads={accountSubIdentitiesHead}
        data={tableData}
      />
    </TableWrapper>
  );
}
