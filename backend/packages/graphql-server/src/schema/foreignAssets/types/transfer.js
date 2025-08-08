const transfer = /* GraphQL */ `
  type ForeignAssetTransfer {
    assetId: String!
    from: String
    to: String
    balance: String
    indexer: Indexer!
  }

  type PagedForeignAssetTransfer {
    transfers: [ForeignAssetTransfer]!
    offset: Int!
    limit: Int!
    total: Int!
  }
`;

module.exports = {
  transfer,
};
