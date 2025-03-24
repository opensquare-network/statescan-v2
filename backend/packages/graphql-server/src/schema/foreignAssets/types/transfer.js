const transfer = /* GraphQL */ `
  type ForeignAssetTransfer {
    assetId: Int!
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
