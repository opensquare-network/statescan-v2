import { gql } from "@apollo/client";
import { useProxyQuery } from "../apollo";
import { LIST_DEFAULT_PAGE_SIZE } from "../../utils/constants";

const GET_PROXY_ANNOUNCEMENTS = gql`
  query MyQuery(
    $delegatee: String
    $delegator: String
    $limit: Int!
    $offset: Int!
    $isFinal: Boolean
  ) {
    proxyAnnouncements(
      limit: $limit
      offset: $offset
      delegatee: $delegatee
      delegator: $delegator
      isFinal: $isFinal
    ) {
      items {
        announcementId
        delegatee
        delegator
        state
        callHash
        normalizedCall
        isFinal
        indexer {
          blockTime
          blockHeight
        }
        executedAt {
          blockTime
          blockHeight
        }
        rejectedAt {
          blockTime
          blockHeight
        }
        removedAt {
          blockTime
          blockHeight
        }
      }
      limit
      offset
      total
    }
  }
`;

export function useProxyAnnouncementsData(
  { delegatee, delegator },
  page = 1,
  pageSize = LIST_DEFAULT_PAGE_SIZE,
) {
  const { data, ...rest } = useProxyQuery(GET_PROXY_ANNOUNCEMENTS, {
    variables: {
      delegatee,
      delegator,
      limit: pageSize,
      offset: (page - 1) * pageSize,
    },
  });

  return {
    data: data?.proxyAnnouncements,
    ...rest,
  };
}
