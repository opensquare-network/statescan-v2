const { REQUEST_STATUS } = require("../../../constants");
const {
  insertJudgementRequest,
  insertRequestTimeline,
} = require("../../../mongo");
const { handleJudgementCommon } = require("./common");

async function handleJudgementRequested(event, indexer) {
  const {
    account,
    registrar: { index: registrarIndex, account: registrar },
  } = await handleJudgementCommon(event, indexer);

  await insertJudgementRequest({
    account,
    registrarIndex,
    registrar,
    indexer,
    status: {
      name: REQUEST_STATUS.PENDING,
      indexer,
    },
    isFinal: false,
  });

  await insertRequestTimeline({
    account,
    registrarIndex,
    requestHeight: indexer.blockHeight,
    indexer,
    name: event.method,
    args: {
      registrarIndex,
    },
  });
}

module.exports = {
  handleJudgementRequested,
};
