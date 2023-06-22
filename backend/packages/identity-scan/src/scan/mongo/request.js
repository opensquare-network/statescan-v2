const {
  identity: { getRequestCol },
} = require("@statescan/mongo");
const isEmpty = require("lodash.isempty");

async function insertJudgementRequest(obj = {}) {
  const col = await getRequestCol();
  await col.insertOne(obj);
}

async function updateJudgementRequest(account, registrarIndex, updates) {
  if (isEmpty(updates)) {
    return;
  }

  const col = await getRequestCol();
  await col.updateOne(
    { account, registrarIndex, isFinal: false },
    { $set: updates },
  );
}

module.exports = {
  insertJudgementRequest,
  updateJudgementRequest,
};
