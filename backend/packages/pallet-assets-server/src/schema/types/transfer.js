const transfer = /* GraphQL */ `
  type Transfer {
    assetId: Int!
    assetHeight: Int!
    from: String
    to: String
    balance: String
    indexer: Indexer!
  }

  type PagedTransfer {
    transfers: [Transfer]!
    offset: Int!
    limit: Int!
    total: Int!
  }
`;

module.exports = {
  transfer,
};
