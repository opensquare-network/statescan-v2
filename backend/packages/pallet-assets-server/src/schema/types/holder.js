const holder = /* GraphQL */ `
  type Holder {
    address: String
    assetId: Int!
    assetHeight: Int!
    asset: Asset
    balance: String
    isFrozen: Boolean
    reason: JSONObject
    status: String
  }

  type PagedHolder {
    holders: [Holder]!
    offset: Int!
    limit: Int!
    total: Int!
  }
`;

module.exports = {
  holder,
};
