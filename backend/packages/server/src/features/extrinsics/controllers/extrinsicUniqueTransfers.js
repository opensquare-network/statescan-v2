const pick = require("lodash.pick");
const {
  uniques: { getInstanceTransferCol, getInstanceCol, getClassCol },
} = require("@statescan/mongo");
const { HttpError } = require("../../../utils");

async function populateNftDetail(transfer) {
  const { classId, classHeight, instanceId, instanceHeight } = transfer;

  const instanceCol = await getInstanceCol();
  const nftInstance = await instanceCol.findOne({
    classId,
    classHeight,
    instanceId,
    instanceHeight,
  });

  if (!nftInstance) {
    throw new HttpError(404, "NFT Instance not found");
  }

  transfer.instance = pick(nftInstance, [
    "indexer",
    "classId",
    "classHeight",
    "instanceId",
    "instanceHeight",
    "isDestroyed",
    "definitionValid",
    "parsedMetadata",
  ]);

  const classCol = await getClassCol();
  const nftClass = await classCol.findOne({
    classId,
    classHeight,
  });

  if (!nftClass) {
    throw new HttpError(404, "NFT Class not found");
  }

  transfer.instance.class = pick(nftClass, [
    "indexer",
    "classId",
    "classHeight",
    "isDestroyed",
    "definitionValid",
    "parsedMetadata",
  ]);
}

async function getExtrinsicUniqueTransfers(ctx) {
  const { blockHeight, extrinsicIndex } = ctx.params;
  const q = {
    "indexer.blockHeight": parseInt(blockHeight),
    "indexer.extrinsicIndex": parseInt(extrinsicIndex),
  };

  const col = await getInstanceTransferCol();
  const items = await col
    .find(q, { projection: { _id: 0 } })
    .sort({
      "indexer.blockHeight": 1,
      "indexer.extrinsicIndex": 1,
      "indexer.eventIndex": 1,
    })
    .toArray();

  for (const item of items) {
    await populateNftDetail(item);
  }

  ctx.body = items;
}

module.exports = {
  getExtrinsicUniqueTransfers,
};
