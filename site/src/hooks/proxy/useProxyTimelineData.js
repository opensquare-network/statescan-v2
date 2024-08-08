import { gql } from "@apollo/client";
import { useProxyQuery } from "../apollo";

const GET_PROXY_TIMELINE = gql`
  query MyQuery($proxyId: String!) {
    proxyTimeline(proxyId: $proxyId) {
      args
      name
      indexer {
        blockTime
        blockHash
        blockHeight
        eventIndex
        extrinsicIndex
      }
    }
  }
`;

export function useProxyTimelineData(proxyId) {
  const { data, ...rest } = useProxyQuery(GET_PROXY_TIMELINE, {
    variables: {
      proxyId,
    },
  });

  return {
    data: data?.proxyTimeline,
    ...rest,
  };
}
