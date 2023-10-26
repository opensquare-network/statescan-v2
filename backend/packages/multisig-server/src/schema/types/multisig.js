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
    id: String!
    address: String!
    signatories: [String]!
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

const timeline = /* GraphQL */ `
  type MultisigTimelineItem {
    multisigId: String
    multisigAddress: String!
    callHash: String!
    whenHeight: Int!
    whenExtrinsicIndex: Int!
    type: String!
    name: String!
    args: JSONObject
    indexer: Indexer!
  }
`;

module.exports = {
  multisigTypeDefs: [when, multisig, timeline],
};
