import { gql } from "@apollo/client";
import { useProxyQuery } from "../apollo";

const GET_PROXY_COUNTS = gql`
  query MyQuery($proxyId: String!, $delegatee: String, $delegator: String) {
    proxyCalls(proxyId: $proxyId, offset: 0, limit: 0) {
      total
    }
    proxyAnnouncements(
      delegatee: $delegatee
      delegator: $delegator
      limit: 0
      offset: 0
    ) {
      total
    }
  }
`;

export function useProxyCountsData({ proxyId, delegatee, delegator } = {}) {
  const { data, ...rest } = useProxyQuery(GET_PROXY_COUNTS, {
    variables: {
      proxyId,
      delegatee,
      delegator,
    },
  });

  return {
    data: {
      announcements: data?.proxyAnnouncements?.total,
      calls: data?.proxyCalls?.total,
    },
    ...rest,
  };
}
