const isEmpty = require("lodash.isempty");
const { getRecoverableCol, getRecoveryCol } = require("./db");

async function updateActiveRecoverable(who, updates = {}) {
  if (isEmpty(updates)) {
    return;
  }

  const col = await getRecoverableCol();
  await col.updateOne({ who, isActive: true }, { $set: updates });
}

async function updateActiveRecovery(lostAccount, rescuerAccount, updates = {}) {
  if (isEmpty(updates)) {
    return;
  }

  const col = await getRecoveryCol();
  await col.updateOne(
    { lostAccount, rescuerAccount, isClosed: false },
    { $set: updates },
  );
}

module.exports = {
  updateActiveRecoverable,
  updateActiveRecovery,
};
