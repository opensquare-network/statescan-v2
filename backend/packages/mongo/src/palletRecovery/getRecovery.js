const { getRecoveryCol } = require("./db");

async function getActiveRecovery(lostAccount, rescuerAccount) {
  const col = await getRecoveryCol();
  const q = { lostAccount, rescuerAccount, isClosed: false };
  return await col.findOne(q);
}

async function getActiveRecoveryOrThrow(
  lostAccount,
  rescuerAccount,
  blockHeight,
) {
  const recovery = await getActiveRecovery(lostAccount, rescuerAccount);
  if (!recovery) {
    throw new Error(
      `Can not find recovery of lost account: ${lostAccount} and rescuer account ${rescuerAccount} at ${blockHeight}`,
    );
  }

  return recovery;
}

module.exports = {
  getActiveRecoveryOrThrow,
};
