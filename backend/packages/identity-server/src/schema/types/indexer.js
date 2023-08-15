const indexer = /* GraphQL */ `
  type Indexer {
    blockHeight: Int!
    blockHash: String!
    blockTime: Float!
    extrinsicIndex: Int
    eventIndex: Int
  }
`;

module.exports = {
  indexer,
};
