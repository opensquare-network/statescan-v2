const {
  identity: { getRequestCol, getRequestTimelineCol },
} = require("@statescan/mongo");
const isEmpty = require("lodash.isempty");

async function insertJudgementRequest(obj = {}) {
  const col = await getRequestCol();
  await col.insertOne(obj);
}

async function getPendingRequest(account, registrarIndex) {
  const col = await getRequestCol();
  return await col.findOne({ account, registrarIndex, isFinal: false });
}

async function getAllPendingRequest(account) {
  const col = await getRequestCol();
  return await col.find({ account, isFinal: false }).toArray();
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

async function insertRequestTimeline(obj) {
  const col = await getRequestTimelineCol();
  await col.insertOne(obj);
}

module.exports = {
  insertJudgementRequest,
  updateJudgementRequest,
  insertRequestTimeline,
  getPendingRequest,
  getAllPendingRequest,
};
