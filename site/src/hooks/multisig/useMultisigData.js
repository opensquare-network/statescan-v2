import { gql } from "@apollo/client";
import { useMultisigUrlParams } from ".";
import { useMultisigQuery } from "../apollo";

const GET_MULTISIG = gql`
  query GetMultisig(
    $account: String!
    $whenExtrinsicIndex: Int!
    $whenHeight: Int!
  ) {
    multisig(
      whenExtrinsicIndex: $whenExtrinsicIndex
      whenHeight: $whenHeight
      account: $account
    ) {
      address
      approvals
      id
      indexer {
        blockTime
        blockHeight
        extrinsicIndex
      }
      call
    }
  }
`;

export function useMultisigData() {
  const { blockHeight, extrinsicIndex, address } = useMultisigUrlParams();

  return useMultisigQuery(GET_MULTISIG, {
    variables: {
      account: address,
      whenExtrinsicIndex: extrinsicIndex,
      whenHeight: blockHeight,
    },
  });
}
