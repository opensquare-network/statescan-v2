const indexer = /* GraphQL */ `
  type Indexer {
    blockHeight: Int!
    blockHash: String!
    blockTime: Int!
    extrinsicIndex: Int
    eventIndex: Int
  }
`;

module.exports = {
  indexer,
};
