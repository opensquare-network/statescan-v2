import { gql } from "@apollo/client";
import { useProxyQuery } from "../apollo";
import { LIST_DEFAULT_PAGE_SIZE } from "../../utils/constants";

const GET_PROXY_CALLS = gql`
  query MyQuery($proxyId: String!, $limit: Int!, $offset: Int!) {
    proxyCalls(limit: $limit, offset: $offset, proxyId: $proxyId) {
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

export function useProxyCallsData(
  proxyId,
  page = 1,
  pageSize = LIST_DEFAULT_PAGE_SIZE,
) {
  const { data, ...rest } = useProxyQuery(GET_PROXY_CALLS, {
    variables: {
      proxyId,
      limit: pageSize,
      offset: (page - 1) * pageSize,
    },
  });

  return {
    data: data?.proxyCalls,
    ...rest,
  };
}
