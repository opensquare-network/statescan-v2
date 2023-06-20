const { handleJudgementCommon } = require("./common");

async function handleJudgementRequested(event, indexer) {
  await handleJudgementCommon(event, indexer);
  // todo: save judgement requests for one registrar
}

module.exports = {
  handleJudgementRequested,
};
