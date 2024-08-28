import { gql } from "@apollo/client";
import { useBlockQuery } from "./apollo";

const GET_BLOCK_INFO = gql`
  query GetBlockInfo($blockHeight: Int!) {
    block(blockHeight: $blockHeight) {
      digest
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
      extrinsics {
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
          indexer {
            blockHash
            blockHeight
            blockTime
            callIndex
            extrinsicIndex
          }
          method
          section
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
      extrinsicsCount
      extrinsicsRoot
      hash
      height
      parentHash
      stateRoot
      time
      validator
    }
  }
`;

export function useQueryBlockInfo(blockHeight) {
  return useBlockQuery(GET_BLOCK_INFO, {
    variables: {
      blockHeight,
    },
  });
}
