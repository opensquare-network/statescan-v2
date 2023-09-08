const {
  identity: { getRequestCol, getRequestTimelineCol },
} = require("@statescan/mongo");
const isEmpty = require("lodash.isempty");
const { REQUEST_STATUS } = require("../constants");

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

async function markAllPendingRequestsRemoved(account, indexer) {
  const pendingRequests = await getAllPendingRequest(account);
  for (const request of pendingRequests) {
    const { registrarIndex, requestHeight } = request;
    await insertRequestTimeline({
      account,
      registrarIndex,
      requestHeight,
      indexer,
      name: REQUEST_STATUS.REMOVED,
      args: {},
    });

    await updateJudgementRequest(account, registrarIndex, {
      status: {
        name: REQUEST_STATUS.REMOVED,
        indexer,
      },
      isFinal: true,
    });
  }
}

module.exports = {
  insertJudgementRequest,
  updateJudgementRequest,
  insertRequestTimeline,
  getPendingRequest,
  getAllPendingRequest,
  markAllPendingRequestsRemoved,
};
