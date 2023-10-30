import { gql } from "@apollo/client";
import { useMultisigLazyQuery } from "../apollo";

const GET_MULTISIG_ADDRESS = gql`
  query GetMultisigAddress($account: String!) {
    multisigAddress(account: $account) {
      signatories
      threshold
    }
  }
`;

export function useMultisigAddressLazyData(address) {
  return useMultisigLazyQuery(GET_MULTISIG_ADDRESS, {
    variables: {
      account: address,
    },
  });
}
