const isEmpty = require("lodash.isempty");
const { getRecoverableCol } = require("./db");

async function updateActiveRecoverable(who, updates = {}) {
  if (isEmpty(updates)) {
    return;
  }

  const col = await getRecoverableCol();
  await col.updateOne({ who, isActive: true }, { $set: updates });
}

module.exports = {
  updateActiveRecoverable,
};
