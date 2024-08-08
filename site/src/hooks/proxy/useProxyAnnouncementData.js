import { gql } from "@apollo/client";
import { useProxyQuery } from "../apollo";

const GET_PROXY_ANNOUNCEMENT = gql`
  query MyQuery($announcementId: String!) {
    proxyAnnouncement(announcementId: $announcementId) {
      state
      callHash
      isFinal
      indexer {
        blockTime
        blockHeight
      }
      normalizedCall
      removedAt {
        blockTime
        blockHeight
      }
      rejectedAt {
        blockTime
        blockHeight
      }
      executedAt {
        blockTime
        blockHeight
      }
    }
  }
`;

export function useProxyAnnouncementData(announcementId) {
  const { data, ...rest } = useProxyQuery(GET_PROXY_ANNOUNCEMENT, {
    variables: {
      announcementId,
    },
  });

  return {
    data: data?.proxyAnnouncement,
    ...rest,
  };
}
