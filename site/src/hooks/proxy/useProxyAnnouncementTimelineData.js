import { gql } from "@apollo/client";
import { useProxyQuery } from "../apollo";

const GET_PROXY_ANNOUNCEMENT_TIMELINE = gql`
  query MyQuery($announcementId: String!) {
    proxyAnnouncementTimeline(announcementId: $announcementId) {
      args
      name
      indexer {
        blockHeight
        blockTime
        eventIndex
        extrinsicIndex
      }
    }
  }
`;

export function useProxyAnnouncementTimelineData(announcementId) {
  const { data, ...rest } = useProxyQuery(GET_PROXY_ANNOUNCEMENT_TIMELINE, {
    variables: {
      announcementId,
    },
  });

  return {
    data: data?.proxyAnnouncementTimeline,
    ...rest,
  };
}
