import { gql } from "@apollo/client";
import { useMultisigUrlParams } from ".";
import { useMultisigQuery } from "../apollo";

const GET_MULTISIG = gql`
  query GetMultisig(
    $account: String!
    $callHash: String!
    $whenExtrinsicIndex: Int!
    $whenHeight: Int!
  ) {
    multisig(
      whenExtrinsicIndex: $whenExtrinsicIndex
      callHash: $callHash
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
      callHash
      call
      signatories
    }
  }
`;

export function useMultisigData() {
  const { blockHeight, extrinsicIndex, address, callHash } =
    useMultisigUrlParams();

  return useMultisigQuery(GET_MULTISIG, {
    variables: {
      account: address,
      callHash,
      whenExtrinsicIndex: extrinsicIndex,
      whenHeight: blockHeight,
    },
  });
}
