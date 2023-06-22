const {
  identity: { getRegistrarsTimelineCol },
} = require("@statescan/mongo");

async function setRegistrarJudgement(method, event, indexer) {
  let registrarJudgement = {};
  const eventData = event.data;
  registrarJudgement.requestingAccountId = eventData[0].toString();
  registrarJudgement.registrarIndex = eventData[1].toNumber();
  registrarJudgement.method = method;

  await addRegistrarsTimelineCollection(registrarJudgement, indexer);
}

async function addRegistrarsTimelineCollection(object, indexer) {
  const collection = await getRegistrarsTimelineCol();
  await collection.insertOne({
    ...object,
    indexer,
  });
}

module.exports = {
  setRegistrarJudgement,
};
