import { gql } from "@apollo/client";
import { useProxyQuery } from "../apollo";

const GET_PROXY_CALLS = gql`
  query MyQuery($proxyId: String!) {
    proxyCalls(limit: 10, offset: 0, proxyId: $proxyId) {
      limit
      offset
      total
      items {
        delegatee
        eventData
        indexer {
          blockTime
          blockHeight
        }
        normalizedCall
        delegator
        callHash
      }
    }
  }
`;

export function useProxyCallsData(proxyId) {
  const { data, ...rest } = useProxyQuery(GET_PROXY_CALLS, {
    variables: {
      proxyId,
    },
  });

  return {
    data: data?.proxyCalls,
    ...rest,
  };
}
