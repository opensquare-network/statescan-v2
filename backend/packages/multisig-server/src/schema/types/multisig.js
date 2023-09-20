const when = /* GraphQL */ `
  type When {
    height: Int!
    index: Int!
  }
`;

// todo: Add updateAt field
const multisig = /* GraphQL */ `
  scalar JSON
  scalar JSONObject

  type Multisig {
    address: String!
    signatoriesCount: Int!
    threshold: Int!
    when: When!
    approvals: [String]!
    state: State!
    deposit: Float!
    depositor: String
    callHash: String!
    call: JSONObject
    callHex: String
    indexer: Indexer!
    isFinal: Boolean!
  }

  type PagedMultisigs {
    multisigs: [Multisig]!
    offset: Int!
    limit: Int!
    total: Int!
  }
`;

module.exports = {
  multisigTypeDefs: [when, multisig],
};
