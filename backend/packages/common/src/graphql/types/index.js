const indexer = /* GraphQL */ `
  type Indexer {
    blockHeight: Int!
    blockHash: String!
    blockTime: Float!
    extrinsicIndex: Int
    eventIndex: Int
  }
`;

const json = /* GraphQl */ `
  scalar JSON
  scalar JSONObject
`;

module.exports = {
  indexer,
  json,
};
