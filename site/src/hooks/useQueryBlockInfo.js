import { gql, useQuery } from "@apollo/client";

const GET_BLOCK_INFO = gql`
  query GetBlockInfo($blockHeightOrHash: BlockHeightOrHash!) {
    block(blockHeightOrHash: $blockHeightOrHash) {
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

export function useQueryBlockInfo(blockId) {
  const blockHeightOrHash = /^\d+$/.test(blockId) ? parseInt(blockId) : blockId;
  return useQuery(GET_BLOCK_INFO, {
    variables: {
      blockHeightOrHash,
    },
  });
}
