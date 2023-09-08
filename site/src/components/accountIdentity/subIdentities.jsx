import { gql, useQuery } from "@apollo/client";

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
  const { data } = useQuery(GET_SUB_IDENTITIES, {
    variables: { account },
  });

  return <div>table</div>;
}
