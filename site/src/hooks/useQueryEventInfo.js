import { gql } from "@apollo/client";
import { useEventQuery } from "./apollo";

const GET_EVENT_INFO = gql`
  query GetEventInfo($blockHeight: Int!, $eventIndex: Int!) {
    event(blockHeight: $blockHeight, eventIndex: $eventIndex) {
      args
      docs
      isExtrinsic
      isExtrinsicResult
      method
      section
      indexer {
        blockHash
        blockHeight
        blockTime
        eventIndex
        extrinsicIndex
      }
    }
  }
`;

export function useQueryEventInfo(blockHeight, eventIndex) {
  return useEventQuery(GET_EVENT_INFO, {
    variables: {
      blockHeight,
      eventIndex,
    },
  });
}
