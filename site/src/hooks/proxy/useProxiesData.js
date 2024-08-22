import { gql } from "@apollo/client";
import { LIST_DEFAULT_PAGE_SIZE } from "../../utils/constants";
import { useProxyQuery } from "../apollo";

const GET_PROXIES = gql`
  query MyQuery(
    $limit: Int!
    $offset: Int!
    $delegatee: String
    $delegator: String
    $isActive: Boolean
    $isPure: Boolean
  ) {
    proxies(
      limit: $limit
      offset: $offset
      delegatee: $delegatee
      delegator: $delegator
      isActive: $isActive
      isPure: $isPure
    ) {
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

export function useProxiesData(
  { delegatee, delegator, isActive, isPure },
  page = 1,
  pageSize = LIST_DEFAULT_PAGE_SIZE,
) {
  const { data, ...rest } = useProxyQuery(GET_PROXIES, {
    variables: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
      delegatee,
      delegator,
      isActive,
      isPure,
    },
  });

  return { data: data?.proxies, ...rest };
}
