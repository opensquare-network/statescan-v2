const { figureIdentity } = require("./identity");
const { figureSubIdentityCount } = require("./sub");
const { figureRequestCount } = require("./request");
const { upsertGeneralStatistics } = require("../../mongo/statistics");

async function saveGeneralStatistics(indexer) {
  const identity = await figureIdentity();
  const subIdentity = await figureSubIdentityCount();
  const request = await figureRequestCount();

  await upsertGeneralStatistics(
    {
      identity,
      subIdentity,
      request,
    },
    indexer,
  );
}

module.exports = {
  saveGeneralStatistics,
};
