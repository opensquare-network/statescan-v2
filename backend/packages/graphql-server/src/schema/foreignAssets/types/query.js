const queries = /* GraphQL */ `
  type Query {
    foreignAssets(
      offset: Int!
      limit: Int!
      sort: ForeignAssetSort
    ): PagedForeignAsset!
    foreignAsset(id: String!): ForeignAsset
    foreignAssetTransfers(
      offset: Int!
      limit: Int!
      assetId: String
      from: String
      to: String
      address: String
    ): PagedForeignAssetTransfer!
    foreignAssetHolders(
      assetId: String!
      offset: Int!
      limit: Int!
    ): PagedForeignAssetHolder!
    foreignAssetsScanHeight: Int
  }
`;

module.exports = {
  queries,
};
