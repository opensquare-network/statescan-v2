const { handleJudgementCommon } = require("./common");

async function handleJudgementUnrequested(event, indexer) {
  await handleJudgementCommon(event, indexer);
  // todo: we need to update the status of the corresponding request. Related user story: As a community member, I want
  //    to see how many pending request do a registrar has, so I can decide whether this registrar is active.
}

module.exports = {
  handleJudgementUnrequested,
};
