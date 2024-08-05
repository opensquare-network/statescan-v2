import { gql } from "@apollo/client";
import { useQueryParams } from "../useQueryParams";
import { LIST_DEFAULT_PAGE_SIZE } from "../../utils/constants";
import { useProxyQuery } from "../apollo";

const GET_PROXIES = gql`
  query MyQuery($limit: Int!, $offset: Int!) {
    proxies(limit: $limit, offset: $offset) {
      items {
        delegatee
        delegator
        delay
        type
        isRemoved
        indexer {
          blockTime
          blockHeight
        }
        proxyId
        isPure
      }
      total
      offset
      limit
    }
  }
`;

export function useProxiesData() {
  const { page = 1 } = useQueryParams();
  const pageSize = LIST_DEFAULT_PAGE_SIZE;

  const { data, ...rest } = useProxyQuery(GET_PROXIES, {
    variables: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
    },
  });

  return { data: data?.proxies, ...rest };
}
