import { gql } from "@apollo/client";
import { useMultisigUrlParams } from ".";
import { useMultisigQuery } from "../apollo";

const GET_MULTISIG_TIMELINE = gql`
  query GetMultisigTimeline(
    $account: String!
    $whenExtrinsicIndex: Int!
    $whenHeight: Int!
  ) {
    multisigTimeline(
      whenExtrinsicIndex: $whenExtrinsicIndex
      whenHeight: $whenHeight
      account: $account
    ) {
    }
  }
`;

export function useMultisigTimelineData() {
  const { blockHeight, extrinsicIndex, address } = useMultisigUrlParams();
  return useMultisigQuery(GET_MULTISIG_TIMELINE, {
    variables: {
      account: address,
      whenExtrinsicIndex: extrinsicIndex,
      whenHeight: blockHeight,
    },
  });
}
