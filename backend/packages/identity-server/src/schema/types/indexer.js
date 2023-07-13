const indexer = /* GraphQL */ `
  type Indexer {
    blockHeight: Int!
    blockHash: String!
    blockTime: String!
    extrinsicIndex: Int
    eventIndex: Int
  }
`;

module.exports = {
  indexer,
};
