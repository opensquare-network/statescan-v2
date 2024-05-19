const recoveryStatistics = /* GraphQL */ `
  type RecoverableStatisticsItem {
    active: Int!
    inactive: Int!
  }

  type RecoveryStatisticsItem {
    unClosed: Int!
    closed: Int!
  }

  type RecoveryStatistics {
    proxies: Int!
    recoverable: RecoverableStatisticsItem!
    recovery: RecoveryStatisticsItem!
  }
`;

module.exports = {
  recoveryStatistics,
};
