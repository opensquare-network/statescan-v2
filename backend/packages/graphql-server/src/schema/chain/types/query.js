const queries = /* GraphQL */ `
  type Query {
    block(blockHeight: Int!): Block
    extrinsic(blockHeight: Int!, extrinsicIndex: Int!): Extrinsic
    event(blockHeight: Int!, eventIndex: Int!): Event
    account(address: String!): Account
  }
`;

module.exports = {
  queries,
};
