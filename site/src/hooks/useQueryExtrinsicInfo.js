import { gql } from "@apollo/client";
import { useExtrinsicQuery } from "./apollo";

const GET_EXTRINSIC_INFO = gql`
  query GetExtrinsicInfo($blockHeight: Int!, $extrinsicIndex: Int!) {
    extrinsic(blockHeight: $blockHeight, extrinsicIndex: $extrinsicIndex) {
      call {
        args
        callIndex
        method
        section
      }
      calls {
        args
        callIndex
        eventAttributes
        method
        section
        indexer {
          blockHash
          blockHeight
          blockTime
          callIndex
          extrinsicIndex
        }
      }
      callsCount
      events {
        args
        docs
        indexer {
          blockHash
          blockHeight
          blockTime
          eventIndex
          extrinsicIndex
        }
        isExtrinsic
        isExtrinsicResult
        method
        section
      }
      eventsCount
      hash
      indexer {
        blockHash
        blockHeight
        blockTime
        extrinsicIndex
      }
      isSigned
      isSuccess
      lifetime
      nonce
      signature
      signer
      tip
      version
    }
  }
`;

export function useQueryExtrinsicInfo(blockHeight, extrinsicIndex) {
  return useExtrinsicQuery(GET_EXTRINSIC_INFO, {
    variables: {
      blockHeight,
      extrinsicIndex,
    },
  });
}
