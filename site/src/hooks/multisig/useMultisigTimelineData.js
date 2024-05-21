import { gql } from "@apollo/client";
import { useMultisigUrlParams } from ".";
import { useMultisigQuery } from "../apollo";

const GET_MULTISIG_TIMELINE = gql`
  query GetMultisigTimeline(
    $account: String!
    $callHash: String!
    $whenExtrinsicIndex: Int!
    $whenHeight: Int!
  ) {
    multisigTimeline(
      whenExtrinsicIndex: $whenExtrinsicIndex
      callHash: $callHash
      whenHeight: $whenHeight
      account: $account
    ) {
      args
      multisigAddress
      multisigId
      name
      type
      indexer {
        blockTime
        blockHeight
        extrinsicIndex
        eventIndex
      }
    }
  }
`;

export function useMultisigTimelineData() {
  const { blockHeight, extrinsicIndex, address, callHash } =
    useMultisigUrlParams();
  return useMultisigQuery(GET_MULTISIG_TIMELINE, {
    variables: {
      account: address,
      callHash,
      whenExtrinsicIndex: extrinsicIndex,
      whenHeight: blockHeight,
    },
  });
}
