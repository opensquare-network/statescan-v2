const queries = /* GraphQL */ `
  enum MultisigState {
    APPROVING
    EXECUTED
    CANCELLED
  }

  enum MultisigAddressSort {
    DEBUT_AT_HEIGHT_DESC
    DEBUT_AT_HEIGHT_ASC
    LATEST_MULTISIG_AT_HEIGHT_DESC
    LATEST_MULTISIG_AT_HEIGHT_ASC
  }

  type Query {
    multisigAddress(account: String!): MultisigAddress
    multisigAddresses(
      offset: Int!
      limit: Int!
      signatory: String
      sort: MultisigAddressSort
    ): PagedMultisigAddresses!
    multisig(
      account: String!
      whenHeight: Int!
      whenExtrinsicIndex: Int!
    ): Multisig
    multisigs(
      offset: Int!
      limit: Int!
      account: String
      signatory: String
      multisigState: MultisigState
    ): PagedMultisigs!
    scanHeight: Int
  }
`;

module.exports = {
  queries,
};
