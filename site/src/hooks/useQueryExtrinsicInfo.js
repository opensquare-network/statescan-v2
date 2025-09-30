import { gql, useQuery } from "@apollo/client";
import isNil from "lodash.isnil";

const GET_EXTRINSIC_INFO = gql`
  query GetExtrinsicInfo($blockHeight: Int!, $extrinsicIndex: Int!) {
    chainExtrinsic(blockHeight: $blockHeight, extrinsicIndex: $extrinsicIndex) {
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
      error {
        type
        detail
      }
    }
  }
`;

export function useQueryExtrinsicInfo(blockHeight, extrinsicIndex) {
  const skip = isNil(blockHeight) || isNil(extrinsicIndex);
  return useQuery(GET_EXTRINSIC_INFO, {
    variables: {
      blockHeight,
      extrinsicIndex,
    },
    skip,
  });
}
