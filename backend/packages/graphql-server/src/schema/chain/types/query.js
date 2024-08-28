const queries = /* GraphQL */ `
  scalar BlockHeightOrHash

  type Query {
    block(blockHeightOrHash: BlockHeightOrHash!): Block
    extrinsic(blockHeight: Int!, extrinsicIndex: Int!): Extrinsic
    event(blockHeight: Int!, eventIndex: Int!): Event
    account(address: String!): Account
  }
`;

module.exports = {
  queries,
};
