const account = /* GraphQL */ `
  type Account {
    data: AccountData
    detail: AccountDetail
  }

  type AccountDetail {
    nonce: Int
    consumers: Int
    providers: Int
    data: AccountDetailData
  }

  type AccountDetailData {
    free: String
    reserved: String
    miscFrozen: String
    feeFrozen: String
  }

  type AccountData {
    free: String
    reserved: String
    feeFrozen: String
    miscFrozen: String
    total: String
    transferrable: String
    lockedBalance: String
    lockedBreakdown: [LockedBreakdown]
    reservedBreakdown: [ReservedBreakdown]
  }

  type LockedBreakdown {
    reasons: String
    amount: String
    id: String
  }

  type ReservedBreakdown {
    amount: String
    id: String
  }
`;

module.exports = {
  account,
};
