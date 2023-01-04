const { getInstance } = require("./get");
const {
  uniques: { getInstanceTransferCol },
} = require("@statescan/mongo");

async function insertInstanceTransfer(classId, instanceId, from, to, indexer) {
  const nftInstance = await getInstance(classId, instanceId);
  if (!nftInstance) {
    throw new Error(`No instance found ${classId}/${instanceId} for transfer`);
  }

  const col = await getInstanceTransferCol();
  await col.insertOne({
    classId,
    classHeight: nftInstance.classHeight,
    instanceId,
    instanceHeight: nftInstance.instanceHeight,
    from,
    to,
    indexer,
  });
}

module.exports = {
  insertInstanceTransfer,
};
