const isNil = require("lodash.isnil");
const {
  uniques: { getMetadataCol, getClassCol, getInstanceCol },
} = require("@statescan/mongo");

async function syncOneMetadataValidity(col, hash, valid) {
  let updates;
  if (isNil(valid)) {
    updates = { $unset: { definitionValid: true } };
  } else {
    updates = { $set: { definitionValid: valid } };
  }

  await col.updateMany({ dataHash: hash }, updates);
}

async function batchSyncMetadataValidity(col, items) {
  if (items.length === 0) {
    return;
  }

  const bulk = col.initializeUnorderedBulkOp();
  for (const item of items) {
    let update = {};
    if (isNil(item.definitionValid)) {
      update = { $unset: { definitionValid: true } };
    } else {
      update = { $set: { definitionValid: item.definitionValid } };
    }
    bulk.find({ dataHash: item.hash }).update(update);
  }
  await bulk.execute();
}

async function markSynced(items = []) {
  if (items.length <= 0) {
    return;
  }

  const col = await getMetadataCol();
  const bulk = col.initializeUnorderedBulkOp();
  for (const item of items) {
    const { hash } = item;
    bulk.find({ hash }).update({ $set: { validitySynced: true } });
  }

  await bulk.execute();
}

async function syncAllMetadataValidity() {
  const metadataCol = await getMetadataCol();
  let items = await metadataCol
    .find({ validitySynced: false })
    .limit(100)
    .toArray();

  while (items.length > 0) {
    await batchSyncMetadataValidity(await getClassCol(), items);
    await batchSyncMetadataValidity(await getInstanceCol(), items);
    await markSynced(items);
    items = await metadataCol
      .find({ validitySynced: null })
      .limit(100)
      .toArray();
  }
}

module.exports = {
  syncOneMetadataValidity,
  syncAllMetadataValidity,
};
