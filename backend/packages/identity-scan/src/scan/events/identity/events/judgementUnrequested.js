const { REQUEST_STATUS } = require("../../../constants");
const {
  updateJudgementRequest,
  insertRequestTimeline,
  getPendingRequest,
} = require("../../../mongo");
const { handleJudgementCommon } = require("./common");

async function handleJudgementUnrequested(event, indexer) {
  const {
    account,
    registrar: { index: registrarIndex },
  } = await handleJudgementCommon(event, indexer);

  await updateJudgementRequest(account, registrarIndex, {
    status: {
      name: REQUEST_STATUS.CANCELLED,
      indexer,
    },
    isFinal: true,
  });

  const pendingRequest = await getPendingRequest(account, registrarIndex);
  if (!pendingRequest) {
    return;
  }

  const requestHeight = pendingRequest.indexer?.blockHeight;
  await insertRequestTimeline({
    account,
    registrarIndex,
    requestHeight,
    indexer,
    name: event.method,
    args: {},
  });
}

module.exports = {
  handleJudgementUnrequested,
};
