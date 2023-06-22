const { REQUEST_STATUS } = require("../../../constants");
const { updateJudgementRequest } = require("../../../mongo");
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

  // todo: insert request timeline
}

module.exports = {
  handleJudgementUnrequested,
};
