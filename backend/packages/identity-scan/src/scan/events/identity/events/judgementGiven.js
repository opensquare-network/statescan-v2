const { addBlockAccount } = require("../../../../store");
const { REQUEST_STATUS } = require("../../../constants");
const { updateJudgementRequest } = require("../../../mongo");

async function handleJudgementGiven(event, indexer) {
  const target = event.data[0].toString();
  const registrarIndex = event.data[1].toNumber();
  addBlockAccount(indexer.blockHash, target);

  await updateJudgementRequest(target, registrarIndex, {
    status: {
      name: REQUEST_STATUS.GIVEN,
      indexer,
    },
  });

  // todo: insert request timeline
}

module.exports = {
  handleJudgementGiven,
};
