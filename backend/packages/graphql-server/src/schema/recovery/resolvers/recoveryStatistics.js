const {
  palletRecovery: { getProxyCol, getRecoverableCol, getRecoveryCol },
} = require("@statescan/mongo");

async function recoveryStatistics(_, _args) {
  const proxyCol = await getProxyCol();
  const proxies = await proxyCol.estimatedDocumentCount();

  const recoverableCol = await getRecoverableCol();
  const activeRecoverables = await recoverableCol.countDocuments({
    isActive: true,
  });
  const inactiveRecoverables = await recoverableCol.countDocuments({
    isActive: false,
  });

  const recoveryCol = await getRecoveryCol();
  const unClosedRecovery = await recoveryCol.countDocuments({
    isClosed: false,
  });
  const closedRecovery = await recoveryCol.countDocuments({ isClosed: true });

  return {
    proxies,
    recoverable: {
      active: activeRecoverables,
      inactive: inactiveRecoverables,
    },
    recovery: {
      unClosed: unClosedRecovery,
      closed: closedRecovery,
    },
  };
}

module.exports = {
  recoveryStatistics,
};
