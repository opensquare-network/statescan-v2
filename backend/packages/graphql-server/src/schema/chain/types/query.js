const queries = /* GraphQL */ `
  scalar BlockHeightOrHash

  type Query {
    chainBlock(blockHeightOrHash: BlockHeightOrHash!): Block
    chainExtrinsic(blockHeight: Int!, extrinsicIndex: Int!): Extrinsic
    chainEvent(blockHeight: Int!, eventIndex: Int!): Event
    chainAccount(address: String!): Account
  }
`;

module.exports = {
  queries,
};
