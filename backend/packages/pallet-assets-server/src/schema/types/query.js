const queries = /* GraphQL */ `
  type Query {
    assets(
      offset: Int!
      limit: Int!
      sort: AssetSort
      destroyed: Boolean
    ): PagedAsset!
    asset(id: Int!, height: Int): Asset
    transfers(
      offset: Int!
      limit: Int!
      assetId: Int
      assetHeight: Int
      from: String
      to: String
      address: String
    ): PagedTransfer!
    scanHeight: Int
  }
`;

module.exports = {
  queries,
};
