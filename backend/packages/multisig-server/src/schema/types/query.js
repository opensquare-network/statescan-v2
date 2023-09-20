const queries = /* GraphQL */ `
  enum MultisigState {
    APPROVING
    EXECUTED
    CANCELLED
  }

  type Query {
    multisigAddress(account: String!): MultisigAddress
    multisig(
      account: String!
      whenHeight: Int!
      whenExtrinsicIndex: Int!
    ): Multisig
    multisigs(
      offset: Int!
      limit: Int!
      account: String
      multisigState: MultisigState
    ): PagedMultisigs!
    scanHeight: Int
  }
`;

module.exports = {
  queries,
};
