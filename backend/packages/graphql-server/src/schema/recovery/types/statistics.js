const recoveryStatistics = /* GraphQL */ `
  type RecoverableStatistics {
    active: Int!
    inactive: Int!
  }

  type RecoveryStatistics {
    unClosed: Int!
    closed: Int!
  }

  type RecoveryStatistics {
    proxies: Int!
    recoverable: RecoverableStatistics!
    recovery: RecoveryStatistics!
  }
`;

module.exports = {
  recoveryStatistics,
};
